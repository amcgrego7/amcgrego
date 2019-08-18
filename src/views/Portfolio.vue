<template>
  <v-container>
    <v-layout wrap>
      <v-flex mb-4 xs6 md3 pa-3>
        <v-combobox v-model="selCousins" :items="cousins" multiple label="Select a cousin"></v-combobox>
      </v-flex>

      <kpis name="Total" :value="portfolioTotal" :screensize="screensize"></kpis>
      <kpis name="Invested" :value="investedTotal" :screensize="screensize"></kpis>
      <kpis name="Return" :value="returnTotal" :screensize="screensize" :color="true"></kpis>

      <v-flex xs12>
        <v-layout justify-left row wrap> 
          <v-flex lg6 sm12 v-for="(stock, index) in ownedStocks" :key="index">
            <stock-card :stock="stock"></stock-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import kpis from "../components/PortfolioKpis";
import stockCard from "../components/PortfolioStockCard";

export default {
  components: {
    kpis,
    stockCard
  },
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
    screensize() {
      return this.$vuetify.breakpoint.name;
    },

    returnTotal() {
      const total = this.portfolioTotal - this.investedTotal;
      return total;
    },
    ownedStocks() {
      return this.stocks.filter(stock => { 
        return stock.owners.length > 0
      })
    },
    stocks() {
      const vm = this;
      const stocks = [...vm.allStocks];
      const cousins = vm.selCousins;

      // If no cousin filter applied, return all stocks
      if (!cousins.length) {

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

        return filterStocks;
      }
    },
    portfolioTotal() {
      return this.portfolioSumProduct(this.stocks);
    },
    investedTotal() {
      return this.investedSumProduct(this.stocks);
    }
  },
  data() {
    return {
      selCousins: [], // Updated by filter selection
      cousins: ["Levi", "Harrison", "Hannah", "Evie"], // List all cousins
      allStocks: [
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
          price: 0,
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
          price: 0,
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
          price: 0,
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

      ],
    };
  },

  created() {
    const vm = this;
    const symbols = vm.allStocks.map(d => {
      return d.symbol;
    });

    vm.axios
      .get(
        "https://cloud.iexapis.com/stable/stock/market/batch" + 
        "?token=pk_044d4ef414aa4be7a4c1a87fea56c926" +
        "&symbols=" +
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

          // _stock["purchases"][0].price = 100;

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
            let t1 = new Date(item.datetime);
            let t2 = new Date();
            let diff = t2.getTime() - t1.getTime();
            let diffHours = Math.ceil(diff / (1000 * 3600));

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
  },

};
</script>