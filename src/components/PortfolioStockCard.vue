<template>
  <v-container pa-3>
    <v-card v-if="stock.owners.length > 0" class="mx-auto text-xs-left" color="cyan darken-2" dark>
      <v-card-title primary-title left class="pb-0">
        <v-layout class="headline text-xs-left" wrap>
          <v-flex class="mr-2" style="flex:none">
            <v-img
              :src="`https://storage.googleapis.com/iex/api/logos/${ stock.symbol + '.png' }`"
              height="60"
              width="60"
              style="border-radius:4px;"
            ></v-img>
          </v-flex>
          <v-flex>
            <p class="mb-2">{{ stock.company }}</p>
            <p class="body">{{ stock.symbol }}</p>
          </v-flex>
        </v-layout>
        <v-flex xs12 sm5 class="headline text-xs-left text-sm-right">
          <div>
            <p class="mb-0" style="display:inline">{{ '$ ' + stock.price.toFixed(2) * stock.purchases[0].shares }} </p>
            <p style="display:inline" class="caption">{{ "(" + stock.purchases[0].shares + ( + stock.purchases[0].shares > 1 ? " shares" : " share") + ")" }} </p>
          </div>
          <v-chip
            class="ml-0"
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
        <v-flex xs12 md5>
          <v-card-text>
            <v-card-text class="see-through">
              <p class="title">Related News</p>
              <div v-for="news in stock.news">
                <p class="caption mb-0">
                  <a :href="news.url" target="blank">{{ news.source }}</a>
                  | {{ news.postedMsg }}
                </p>
                <p class="body-1">{{ news.headline }}</p>
              </div>
            </v-card-text>
          </v-card-text>
        </v-flex>


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

          <v-card-text class="pt-0">
            <table>
              <thead>
                <tr>
                  <th>Owner</th>
                  <th>%</th>
                  <th>$</th>
                </tr>
              </thead>
              <tr v-for="owner in stock.owners">
                <td>{{ owner.name}}</td>
                <td>{{ (owner.percent * 100).toFixed(0) + '%'}}</td>
                <td>{{ '$ ' + (owner.percent * stock.price * stock.purchases[0].shares ).toFixed(2)}}</td>
              </tr>
            </table>
          </v-card-text>
        </v-flex>

      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: ["stock", "screensize"],
  computed : {
    screenPadding() {
      return this.screensize === 'xs'
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  text-align: center;
  border-spacing: 0;
}

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

tr:hover {
  background-color: #ddd;
}

a {
  color: #fff;
  font-weight: bold;
}
.see-through {
  background-color: rgba(0, 0, 0, 0.12);
}
</style>

