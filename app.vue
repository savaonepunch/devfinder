<template>
  <div>
    <div class="app">
      <div class="container">
        <div class="header">
          <h1 class="title">devfinder</h1>
          <div @click="changeTheme" class="theme-button">
            <span>{{ themeStore.dark ? "DARK" : "LIGHT" }}</span>
            <Icon v-if="themeStore.dark" name="uil:moon" />
            <Icon v-else name="uil:sun" />
          </div>
        </div>
        <div @click="focusInput" class="search-container">
          <Icon name="ph:magnifying-glass-bold" />
          <input
            ref="inputField"
            type="text"
            name=""
            id=""
            placeholder="Search GitHub username..."
          />
          <button>Search</button>
        </div>
        <div class="info-container">
          <div class="profile-picture">
            <img :src="user.avatar_url" alt="User Avatar" />
          </div>
          <div class="info">
            <div class="user-info">
              <h1>{{ user.name ? user.name : 'N/A' }}</h1>
              <span>Joined {{ joinDate }}</span>
            </div>
            <div class="user-login">
              <span>@{{ user.login }}</span>
            </div>
            <div class="user-bio">
              <span>{{ user.bio ? user.bio : 'This profile has no bio.' }}</span>
            </div>
            <div class="user-stats">
              <div class="stat">
                <span class="name">Repos</span>
                <span class="value">{{user.public_repos}}</span>
              </div>
              <div class="stat">
                <span class="name">Followers</span>
                <span class="value">{{user.followers}}</span>
              </div>
              <div class="stat">
                <span class="name">Following</span>
                <span class="value">{{user.following}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const themeStore = useThemeStore();

const inputField = ref();
const joinDate = computed(() => {
  let dateString = user.value.created_at;
  let date = new Date(dateString);
  let formattedDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return formattedDate;
});

const { data: user } = await useFetch("https://api.github.com/users/octocat");

useHead({
  htmlAttrs: {
    class: themeStore.dark ? "" : "light-theme",
  },
});

const changeTheme = () => {
  themeStore.dark = !themeStore.dark;
  document.documentElement.classList.toggle("light-theme", !themeStore.dark);
};

const focusInput = () => inputField.value.focus();
</script>

<style lang="scss" scoped>
div.app {
  box-sizing: border-box;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;

  & div.container {
    width: 100%;
    max-width: 1000px;

    & div.header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      & div.theme-button {
        display: flex;
        align-items: center;

        & span {
          margin-right: 15px;
        }

        & .icon {
          font-size: 1.5rem;
        }

        &:hover {
          cursor: pointer;
        }
      }
    }

    & div.search-container {
      box-sizing: border-box;
      background-color: var(--background-color-secondary);
      border-radius: 12px;
      height: 70px;
      display: flex;
      justify-content: space-between;
      padding: 10px;
      padding-left: 0px;
      align-items: center;

      & .icon {
        font-size: 2rem;
        color: var(--accent-color);
        // background-color: red;
        min-width: 60px;
      }

      & input {
        all: unset;
        height: 100%;
        width: 100%;
        color: var(--text-primary-color);

        &::placeholder {
          color: var(--text-primary-color);
          opacity: 60%;
        }
      }

      & button {
        all: unset;
        height: 100%;
        min-width: 120px;
        border-radius: 10px;
        background-color: var(--accent-color);
        text-align: center;
        font-weight: 500;
        color: white;
        line-height: 1px;
        transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

        &:hover {
          cursor: pointer;
          background-color: var(--text-primary-color);
          color: var(--accent-color);
        }
      }

      &:hover {
        cursor: text;
      }
    }

    & div.info-container {
      display: flex;
      background-color: var(--background-color-secondary);
      height: 500px;
      border-radius: 16px;
      margin-top: 26px;
      padding: 50px;
      box-sizing: border-box;
      justify-content: space-between;

      & div.profile-picture {
        width: 150px;
        min-width: 150px;
        height: 150px;
        border-radius: 100px;
        overflow: hidden;
        margin-right: 50px;

        & img {
          width: 100%;
        }
      }

      & div.info {
        // background-color: red;
        display: flex;
        flex-direction: column;
        width: 100%;
        font-size: 1.15rem;
        & div.user-info {
          display: flex;
          align-items: center;
          justify-content: space-between;

          & h1 {
            font-size: 2rem;
            margin: 0;
          }

          margin-bottom: 10px;
        }

        & div.user-login {
          color: var(--accent-color);
          margin-bottom: 30px;
        }

        & div.user-stats {
          background-color: var(--background-color-primary);
          display: flex;
          border-radius: 10px;
          height: 120px;
          align-items: center;
          box-sizing: border-box;
          padding: 50px;
          justify-content: space-between;
          margin: 40px 0;

          & div.stat {
            display: flex;
            flex-direction: column;

            & span.value {
              font-size: 1.6rem;
              font-weight: 600;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 480px) {
  div.app {
    font-size: 0.8rem;
  }
}
</style>
