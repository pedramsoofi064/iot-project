<template>
  <section class="sidebar">
    <v-navigation-drawer permanent color="none">
      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          exact
          class="route-link"
          :to="item.to"
          :disabled="item.disabled"
        >
          <span class="route-link__icon">
            <component :is="iconSelector(item)" />
          </span>
          <span class="route-link__text">
            {{ item.name }}
          </span>
        </v-list-item></v-list
      >
      <v-list dense nav>
        <v-list-item link class="logout route-link" @click="logout()">
          <span class="route-link__icon">
            <logOutSvg />
          </span>
          <span class="route-link__text">خروج </span>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </section>
</template>

<script>
import peopleFillSvg from "@/assets/svg/ic_people_fill.svg";
import peopleOutlineSvg from "@/assets/svg/ic_people_outline.svg";
import logOutSvg from "@/assets/svg/ic_logout.svg";
import settingOutlineSvg from "@/assets/svg/ic_setting_outline.svg";
import userFillSvg from "@/assets/svg/ic_user_fill.svg";
import userOutlineSvg from "@/assets/svg/ic_user_outline.svg";
import server1Icon from "@/assets/svg/ic_server.svg";
import server2Icon from "@/assets/svg/ic_server2.svg";
import DashboardIcon from "@/assets/svg/ic_dashboard.svg";

export default {
  components: {
    peopleFillSvg,
    peopleOutlineSvg,
    logOutSvg,
    settingOutlineSvg,
    server1Icon,
    server2Icon,
    userFillSvg,
    userOutlineSvg,
    DashboardIcon,
  },
  data() {
    return {
      drawer: true,
      items: [
        {
          name: "داشبورد",
          icon: {
            fill: DashboardIcon,
            outline: DashboardIcon,
          },
          to: "/dashboard",
        },
        {
          name: "سنسور ",
          icon: {
            fill: server1Icon,
            outline: server1Icon,
          },
          to: "/dashboard/sensor",
        },
        {
          name: "گیت وی",
          icon: {
            fill: server2Icon,
            outline: server2Icon,
          },
          to: "/dashboard/gateway",
        },
        {
          name: "اطلاعات کاربری",
          disabled: true,
          icon: {
            fill: userOutlineSvg,
            outline: userOutlineSvg,
          },
          to: "/dashboard/profile",
        },
      ],
    };
  },
  methods: {
    iconSelector(item) {
      if (this.$route.path === item.to) return item.icon.fill;
      else return item.icon.outline;
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/account");
    },
  },
};
</script>

<style lang="scss">
.sidebar {
  width: 30%;
  backdrop-filter: saturate(150%) blur(5px);

  .v-navigation-drawer {
    width: unset !important;
    background-color: unset !important;
    .v-list {
      padding: 0;
    }
    &__content {
      height: 100% !important;
      padding: 35px 20px 20px;
      border-radius: 16px;
      height: unset;
      position: sticky;
      top: 0;
    }
    .route-link {
      display: flex;
      border-radius: 16px;
      padding: 0 15px;
      margin: 20px 0;
      &__icon {
        margin-left: 15px;
      }

      &.v-list-item--active {
        background-color: var(--primary-lightest);
        // color: var(--primary-main);
        &::before {
          background-color: unset;
        }
      }
    }
    .v-navigation-drawer__border {
      display: none;
    }
    .logout {
      margin-top: 50px;
    }
  }
}
</style>