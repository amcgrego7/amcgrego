<template>
<div>
  <vue-headful
      title="Cousins Portfolio"
      description="A family adventure in stock investing"
  />
  <v-container>
    <v-layout wrap>
      <v-flex mb-4 xs6 md3 pa-3>
        <v-combobox v-model="selCousins" :items="cousins" multiple label="Select a cousin"></v-combobox>
      </v-flex>

      <v-flex xs6 md3 pa-3>
        <v-card color="blue-grey darken-2" class="white--text">
          <v-card-title primary-title>
            <v-flex>
              <p class="headline text-xs-center ma-1">Total</p>
              <v-divider></v-divider>
              <p class="headline text-xs-center ma-1">$ {{ portfolioTotal.toFixed(2) }}</p>
            </v-flex>
          </v-card-title>
        </v-card>
      </v-flex>

      <v-flex xs6 md3 pa-3>
        <v-card color="blue-grey darken-2" class="white--text">
          <v-card-title primary-title>
            <v-flex>
              <p class="headline text-xs-center ma-1">Invested</p>
              <v-divider></v-divider>
              <p class="headline text-xs-center ma-1">$ {{ investedTotal.toFixed(2) }}</p>
            </v-flex>
          </v-card-title>
        </v-card>
      </v-flex>

      <v-flex xs6 md3 pa-3>
        <v-card color="blue-grey darken-2" class="white--text">
          <v-card-title primary-title>
            <v-flex>
              <p class="headline text-xs-center ma-1">Returns</p>
              <v-divider></v-divider>
              <p
                class="headline text-xs-center ma-1"
                v-bind:class="returnTotal >= 0 ? 'green--text' : 'red--text'"
              >
              {{ returnTotal > 0 ? "$ " + returnTotal : "($ " + Math.abs(returnTotal) + ")" }}
              </p>
            </v-flex>
          </v-card-title>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-layout justify-left row wrap>
          <v-flex lg6 sm12 v-for="stock in stocks" :key="stock">
            <v-container>
              <v-card
                v-if="stock.owners.length > 0"
                class="mx-auto text-xs-left"
                color="#19BDD1"
                dark
              >
                <v-card-title primary-title xs12 left class="pb-0">
                  <v-flex class="headline text-xs-left" xs7>
                    <v-layout row wrap>
                      <v-flex xs4 md3>
                        <v-img
                          :src="`https://storage.googleapis.com/iex/api/logos/${ stock.symbol + '.png' }`"
                          height="60"
                          width="60"
                          style="border-radius:4px"
                        ></v-img>
                      </v-flex>
                      <v-flex>
                        <p class="mb-2">{{ stock.company }}</p>
                        <p class="title">{{ stock.symbol }}</p>
                      </v-flex>
                    </v-layout>
                  </v-flex>

                  <v-flex right class="headline text-xs-right">
                    <p class="mb-0">{{ '$ ' + stock.price }}</p>
                    <v-chip
                      label
                      :color="stock.changePercent >= 0 ? 'green' : 'red'"
                      text-color="white"
                    >
                      <v-icon
                        left
                        large
                        class="pa-0 mr-0"
                      >arrow_drop_{{ stock.changePercent >= 0 ? "up" : "down" }}</v-icon>
                      {{ stock.changePercent >= 0 ? "Up" : "Down" }}
                      {{ (stock.changePercent * 100).toFixed(2) }}% today
                    </v-chip>
                  </v-flex>
                </v-card-title>

                <v-layout row wrap>
                  <v-flex xs12 md7>
                    <v-card-text pa-0>
                      <v-sheet color="rgba(0, 0, 0, .12)">
                        <div color="white" class="caption text-uppercase pl-3 pt-3">3 Months</div>
                        <v-sparkline
                          :value="stock.qtrValues"
                          color="rgba(255, 255, 255, .7)"
                          height="100"
                          padding="24"
                          stroke-linecap="round"
                          smooth
                        >
                          <template slot="label" slot-scope="item">$ {{ item.value }}</template>
                        </v-sparkline>
                      </v-sheet>
                    </v-card-text>

                    <v-card-text>
                      <table>
                        <thead>
                          <tr>
                            <th>Owner</th>
                            <th>%</th>
                            <th>$</th>
                          </tr>
                        </thead>
                        <!-- esline-disable-next-line -->
                        <tr v-for="owner in stock.owners" :key="owner">
                          <td>{{ owner.name}}</td>
                          <td>{{ (owner.percent * 100).toFixed(0) + '%'}}</td>
                          <td>{{ '$ ' + (owner.percent * stock.price ).toFixed(2)}}</td>
                        </tr>
                      </table>
                    </v-card-text>
                  </v-flex>
                  <v-flex xs12 md5>
                    <v-card-text>
                      <v-card-text class="see-through">
                        <p class="title">Related News</p>
                        <div v-for="news in stock.news" :key="news">
                          <p class="caption mb-0">
                            <a :href="news.url" target="blank">{{ news.source }}</a>
                            | {{ news.postedMsg }}
                          </p>
                          <p class="body-1">{{ news.headline }}</p>
                        </div>
                      </v-card-text>
                    </v-card-text>
                  </v-flex>
                </v-layout>

                <!-- <v-card-actions class="justify-center">
                  <v-btn block flat>More Details</v-btn>
                </v-card-actions>-->
              </v-card>
            </v-container>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>

</div>
</template>

<script>
export default {
  methods: {
    sumProp: function(arr, prop) {
      return arr.reduce(function(acc, cur) {
        return acc + cur[prop];
      }, 0);
    },
    portfolioSumProduct: function(arr) {
      const vm = this;
      return arr.reduce(function(acc, cur) {
        return (
          acc +
          cur.price *
            vm.sumProp(cur.purchases, "shares") *
            vm.sumProp(cur.owners, "percent")
        );
      }, 0);
    },
    investedSumProduct: function(arr) {
      const vm = this;
      return arr.reduce(function(acc, cur) {
        return (
          acc +
          vm.sumProp(cur.purchases, "price") *
            vm.sumProp(cur.purchases, "shares") *
            vm.sumProp(cur.owners, "percent")
        );
      }, 0);
    }
  },

  computed: {
    returnTotal() {
      const total = this.portfolioTotal - this.investedTotal;
      return total.toFixed(2);
    },
    stocks() {
      const vm = this;
      const stocks = [...vm.allStocks];
      const cousins = vm.selCousins;

      // If no cousin filter applied, return all stocks
      if (!cousins.length) {
        this.portfolioTotal = this.portfolioSumProduct(stocks);
        this.investedTotal = this.investedSumProduct(stocks);
        return stocks;

        // Otherwise apply filter for cousin
      } else {
        // Performs a filter of the owners
        const filterStocks = stocks.map(currStock => {
          const stock = { ...currStock };
          stock.owners = stock.owners.filter(owner => {
            return cousins.indexOf(owner.name) !== -1;
          });

          return stock;
        });

        this.portfolioTotal = this.portfolioSumProduct(filterStocks);
        this.investedTotal = this.investedSumProduct(filterStocks);
        return filterStocks;
      }
    }
  },
  data() {
    return {
      portfolioTotal: 0, // Total portfolio value
      investedTotal: 0, // Total investment re-caculated after cousins filter
      selCousins: [], // Updated by filter selection
      cousins: ["Levi", "Harrison", "Hannah", "Evie"], // List all cousins
      allStocks: [
        {
          company: "Microsoft",
          symbol: "MSFT",
          news: [],
          qtrValues: [],
          purchases: [
            {
              date: "20181219",
              shares: 1,
              price: 103.67
            }
          ],
          price: null,
          changePercent: null,
          owners: [
            {
              name: "Levi",
              percent: 0.25
            },
            {
              name: "Harrison",
              percent: 0.25
            },
            {
              name: "Hannah",
              percent: 0.25
            },
            {
              name: "Evie",
              percent: 0.25
            }
          ]
        },
        {
          company: "Facebook",
          symbol: "FB",
          news: [],
          purchases: [
            {
              date: "20180917",
              shares: 1,
              price: 161.81
            }
          ],
          price: null,
          changePercent: null,
          owners: [
            {
              name: "Levi",
              percent: 0.5
            },
            {
              name: "Harrison",
              percent: 0.25
            },
            {
              name: "Hannah",
              percent: 0.25
            }
          ]
        },
        {
          company: "Bank of America",
          symbol: "BAC",
          news: [],
          changePercent: null,
          purchases: [
            {
              date: "20180917",
              shares: 1,
              price: 30.85
            }
          ],
          price: null,
          owners: [
            {
              name: "Levi",
              percent: 0.5
            },
            {
              name: "Harrison",
              percent: 0.25
            },
            {
              name: "Hannah",
              percent: 0.25
            }
          ]
        }
      ]
    };
  },
  mounted() {
    const vm = this;
    const symbols = vm.allStocks.map(d => {
      return d.symbol;
    });

    vm.axios
      .get(
        "https://api.iextrading.com/1.0/stock/market/batch?symbols=" +
          symbols.join(",") +
          "&types=quote,news,chart&range=3m&last=3"
      )
      .then(response => {
        // Iterate through current stock information and
        // insert relevant and formated data in the
        // allStocks array
        Object.keys(response.data).forEach(symbol => {
          const _stock = vm.allStocks.find(stock => {
            return stock.symbol === symbol;
          });

          // Latest price of stock
          _stock["price"] = response.data[symbol].quote.latestPrice;

          // Change % between current day and prior day
          _stock["changePercent"] = response.data[symbol].quote.changePercent;

          // Get weekly dates from the 3 months to build chart
          const len = response.data[symbol].chart.length;
          _stock["qtrValues"] = response.data[symbol].chart.reduce(function(
            filtered,
            option,
            idx
          ) {
            // If index by 9 we keep the value
            const isInteger = Number.isInteger((idx + 9) / 9);
            if (isInteger) {
              filtered.push(Number(option.close.toFixed(0)));

              // Or if it's the last item, include it
            } else if (idx === len - 1) {
              filtered.push(Number(option.close.toFixed(0)));
            }
            return filtered;
          },
          []);

          // Format the news time stamp
          _stock["news"] = response.data[symbol].news.map(item => {
            // getHours
            let msg = "";
            const t1 = new Date(item.datetime.split("T")[0]);
            const t2 = new Date();
            const diff = t2.getTime() - t1.getTime();
            const diffHours = Math.ceil(diff / (1000 * 3600));

            // if less than 2 hour ago, singular "hour"
            if (diffHours <= 2) {
              msg = diffHours + " hour ago";

              // if =< 24 hours ago, plurar "hours"
            } else if (diffHours <= 24) {
              msg = diffHours + " hours ago";

              // if < 2 days ago, singular "day"
            } else if (diffHours <= 48) {
              msg = Math.floor(diffHours / 24) + " day ago";
            }

            // else plural days
            else {
              msg = Math.floor(diffHours / 24) + " days ago";
            }

            item["postedMsg"] = msg;
            return item;
          });
        });
      });
  }
};
</script>

<style scoped>
td,
th {
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #f5f5f5;
  color: #616161;
}
th {
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: #e0e0e0;
}

table {
  width: 100%;
  text-align: center;
  border-spacing: 0;
}

a {
  color: #fff;
  font-weight: bold;
}

tr:hover {
  background-color: #ddd;
}

.see-through {
  background-color: rgba(0, 0, 0, 0.12);
}
</style>
