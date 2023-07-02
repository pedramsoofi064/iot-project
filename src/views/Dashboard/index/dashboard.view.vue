<template>
  <section class="dashboard-main">
    <div class="dashboard-main__shortcuts">
      <div
        class="dashboard-main__shortcuts-item"
        :class="{ badUsage: badUsage }"
      >
        <template v-if="loadingAvg">
          <v-progress-circular
            :size="50"
            color="secondary"
            indeterminate
            style="inset: 30%"
          ></v-progress-circular>
        </template>
        <template v-else>
          <div class="shortcuts-item__info">
            <span class="shortcuts-item__info-icon">
              <userOutlineSvg></userOutlineSvg>
            </span>
            <span class="shortcuts-item__info-text">وضعیت مصرف</span>
          </div>
          <div class="shortcuts-item__value">
            {{ badUsage ? "پر مصرف" : "کم مصرف" }}
          </div>
        </template>
      </div>
      <div class="dashboard-main__shortcuts-item">
        <template v-if="loadingAvg">
          <v-progress-circular
            :size="50"
            color="secondary"
            indeterminate
            style="inset: 30%"
          ></v-progress-circular>
        </template>
        <template v-else>
          <div class="shortcuts-item__info">
            <span class="shortcuts-item__info-icon">
              <server1Icon></server1Icon>
            </span>
            <span class="shortcuts-item__info-text">میانگین مصرف</span>
          </div>
          <div class="shortcuts-item__value">
            {{ Number(avg).toFixed(3) }}
          </div>
        </template>
      </div>
      <div class="dashboard-main__shortcuts-item">
        <template v-if="loadingAvg">
          <v-progress-circular
            :size="50"
            color="secondary"
            indeterminate
            style="inset: 30%"
          ></v-progress-circular>
        </template>
        <template v-else>
          <div class="shortcuts-item__info">
            <span class="shortcuts-item__info-icon">
              <server1Icon></server1Icon>
            </span>
            <span class="shortcuts-item__info-text">تعداد سنسور ها</span>
          </div>
          <div class="shortcuts-item__value">
            {{ sensors.length }}
          </div>
        </template>
      </div>
      <div class="dashboard-main__shortcuts-item">
        <template v-if="loadingAvg">
          <v-progress-circular
            :size="50"
            color="secondary"
            indeterminate
            style="inset: 30%"
          ></v-progress-circular>
        </template>
        <template v-else>
          <div class="shortcuts-item__info">
            <span class="shortcuts-item__info-icon">
              <server2Icon></server2Icon>
            </span>
            <span class="shortcuts-item__info-text">تعداد گیت‌وی ها</span>
          </div>
          <div class="shortcuts-item__value">{{ gateways.length }}</div>
        </template>
      </div>
    </div>

    <div class="dashboard-main__orders">
      <h3>مجموع مصرفی</h3>
      <div>
        <v-select
        :items="periods"
        placeholder="بازه"
        item-text="title"
        item-value="value"
        v-model="selectedPeriod"
      ></v-select>
      <apexchart
        v-if="!loadingSum"
        type="bar"
        :options="sumOption"
        :series="sumSeries"
      ></apexchart>
      </div>
    </div>
  </section>
</template>

<script src="./dashboard.view.js">
</script>

<style lang="scss" src="./dashboard.view.scss">
</style>