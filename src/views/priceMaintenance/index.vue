<!-- 价格维护 -->
<template>
  <div class="priceMaintenance">
    <div class="cards">
      <div class="line">
        <div class="item">
          <price-cards
            v-if="!isActive1"
            title-msg="充电桩价格"
            @isStatus="checkActive(1)"
          />
          <modify-price
            v-if="isActive1"
            title-msg="充电桩价格维护"
            @isStatus="checkActives(1)"
          />
        </div>
        <div class="item">
          <price-cards
            v-if="!isActive2"
            title-msg="储能堆价格"
            @isStatus="checkActive(2)"
          />
          <modify-price
            v-if="isActive2"
            title-msg="储能堆价格维护"
            @isStatus="checkActives(2)"
          />
        </div>
      </div>
      <div class="line">
        <div class="item">
          <price-cards
            v-if="!isActive3"
            title-msg="光伏价格"
            @isStatus="checkActive(3)"
          />
          <modify-price
            v-if="isActive3"
            title-msg="光伏价格维护"
            @isStatus="checkActives(3)"
          />
        </div>
        <div class="item">
          <price-cards
            v-if="!isActive4"
            title-msg="电网价格"
            @isStatus="checkActive(4)"
          />
          <modify-price
            v-if="isActive4"
            title-msg="电网价格维护"
            @isStatus="checkActives(4)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PriceCards from "./component/PriceCards";
import ModifyPrice from "./component/ModifyPrice";
import {
  searchTableData,
  deleteOperation,
  selectBasicsEq1uipmentList,
  insertOperation,
  updateOperation,
} from "./basics_sectional_tariff";
export default {
  components: { PriceCards, ModifyPrice },
  data() {
    return {
      isActive1: false,
      isActive2: false,
      isActive3: false,
      isActive4: false,
    };
  },
  mounted() {},
  methods: {
    checkActive(k) {
      switch (k) {
        case 1:
          this.isActive1 = true;
          break;
        case 2:
          this.isActive2 = true;
          break;
        case 3:
          this.isActive3 = true;
          break;
        case 4:
          this.isActive4 = true;
          break;
      }
    },
    checkActives(k) {
      switch (k) {
        case 1:
          this.isActive1 = false;
          break;
        case 2:
          this.isActive2 = false;
          break;
        case 3:
          this.isActive3 = false;
          break;
        case 4:
          this.isActive4 = false;
          break;
      }
    },
    getData() {},
  },
};
</script>

<style lang="scss" scoped>
.priceMaintenance {
  .cards {
    font-size: 16px;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .line {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      .item {
        flex: 1;
        border: 1px solid #dcdcdc;
        margin-right: 20px;
        &:last-child {
          margin-right: 0px;
        }
        .title {
          height: 64px;
          line-height: 64px;
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
