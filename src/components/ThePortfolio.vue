<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex mb-4 xs4>
        <v-combobox
          v-model="selCousins"
          :items="cousins"
          multiple
          label="Select one or more cousin"
        ></v-combobox>
      </v-flex>

      <v-flex xs12>
        <v-layout justify-left>
          <table>
            <thead>
              <th>Company</th>
              <th>Shares</th>
              <th>Current Price</th>
              <th>Owner</th>
              <th>% Own</th>
              <th>$ Own</th>
            </thead>

            <!-- eslint-disable-next-line -->
            <tbody v-for="(stock, index) in stocks">
              <tr v-if="stock.owners.length > 0">
                <td :rowspan="stock.owners.length + 1">           
                  <v-card class="mx-auto text-xs-center" color="green" dark max-width="600">
                    <v-card-text>
                      <v-sheet color="rgba(0, 0, 0, .12)">
                        <v-sparkline
                          :value="value"
                          color="rgba(255, 255, 255, .7)"
                          height="100"
                          padding="24"
                          stroke-linecap="round"
                          smooth
                        >
                          <template slot="label" slot-scope="item">${{ item.value }}</template>
                        </v-sparkline>
                      </v-sheet>
                    </v-card-text>

                    <v-card-text>
                      <div class="display-1 font-weight-thin">{{ stock.company + ' (' + stock.symbol + ')'}}</div>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions class="justify-center">
                      <v-btn block flat>Go to Report</v-btn>
                    </v-card-actions>
                  </v-card>
                </td>

                <td :rowspan="stock.owners.length + 1">{{ sumProp(stock.purchases, 'shares')}}</td>

                <td :rowspan="stock.owners.length + 1">{{ '$' + stock.price }}</td>
              </tr>

              <!-- eslint-disable-next-line -->
              <tr v-for="(owner, index) in stock.owners">
                <td>{{ owner.name}}</td>
                <td>{{ (owner.percent * 100).toFixed(0) + '%'}}</td>
                <td>{{ '$' + (owner.percent * stock.price ).toFixed(2)}}</td>
              </tr>
            </tbody>
            <tfoot>
              <td colspan="4"></td>
              <td>Total</td>
              <td>{{ '$' + portfolioTotal.toFixed(2) }}</td>
            </tfoot>
          </table>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  methods: {
    sumProp: function(arr, prop) {
      return arr.reduce(function(acc, cur) {
        return acc + cur[prop];
      }, 0);
    },
    sumProduct: function(arr) {
      const vm = this;
      return arr.reduce(function(acc, cur) {
        return (
          acc +
          cur.price *
            vm.sumProp(cur.purchases, "shares") *
            vm.sumProp(cur.owners, "percent")
        );
      }, 0);
    }
  },

  computed: {
    stocks() {
      const vm = this;
      const stocks = [...vm.allStocks];
      const cousins = vm.selCousins;

      // If no cousin filter applied, return all stocks
      if (!cousins.length) {
        this.portfolioTotal = this.sumProduct(stocks);
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

        this.portfolioTotal = this.sumProduct(filterStocks);
        return filterStocks;
      }
    }
  },
  data() {
    return {
      value: [423, 446, 675, 510, 590, 610, 760],
      cousins: ["Levi", "Harrison", "Hannah", "Evie"],
      selCousins: [],
      portfolioTotal: 0,
      allStocks: [
        {
          company: "Microsoft",
          symbol: "MSFT",
          purchases: [
            {
              date: "2018-12-19",
              shares: 1,
              amount: null
            }
          ],
          price: null,
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
          purchases: [
            {
              date: "2018-09-17",
              shares: 1,
              amount: null
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
        },
        {
          company: "Bank of America",
          symbol: "BAC",
          purchases: [
            {
              date: "2018-09-17",
              shares: 1,
              amount: null
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
    vm.allStocks.forEach(stock => {
      vm.axios
        .get("https://api.iextrading.com/1.0/stock/" + stock.symbol + "/price")
        .then(response => {
          stock.price = response.data;
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
}
tfoot {
  font-weight: bold;
}
table {
  border-collapse: collapse;
}
/* tr:nth-child(even){background-color: #f2f2f2;} */

tr:hover {
  background-color: #ddd;
}

th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4caf50;
  color: white;
}
</style>
