<template>
  <div>
    <div class="app">
      <div v-if="user" class="container">
        <div class="header">
          <h1 class="title">devfinder</h1>
          <div @click="changeTheme" class="theme-button">
            <span>{{ themeStore.dark ? "DARK" : "LIGHT" }}</span>
            <Icon v-if="themeStore.dark" name="uil:moon" />
            <Icon v-else name="uil:sun" />
          </div>
        </div>
        <form
          :style="{ border: notFound ? '1px solid red' : '' }"
          @submit.prevent="searchUser"
          @click="focusInput"
          class="search-container"
        >
          <Icon name="ph:magnifying-glass-bold" />
          <input
            ref="inputField"
            type="text"
            name=""
            id=""
            placeholder="Search GH user"
            class="sm"
            v-model="inputValue"
          />
          <input
            ref="inputField"
            type="text"
            name=""
            id=""
            placeholder="Search GitHub username..."
            class="lg"
            v-model="inputValue"
          />
          <button type="submit">Search</button>
        </form>
        <div class="info-container">
          <div class="profile-picture">
            <img :src="user.avatar_url" alt="User Avatar" />
          </div>
          <div class="info">
            <div class="user-info">
              <h1>{{ user.name ? user.name : "N/A" }}</h1>
              <span>Joined {{ joinDate }}</span>
            </div>
            <div class="user-login">
              <span>@{{ user.login }}</span>
            </div>
            <div class="user-bio">
              <span>{{ user.bio ? user.bio : "This profile has no bio." }}</span>
            </div>
            <div class="user-stats">
              <div class="stat">
                <span class="name">Repos</span>
                <span class="value">{{ user.public_repos }}</span>
              </div>
              <div class="stat">
                <span class="name">Followers</span>
                <span class="value">{{ user.followers }}</span>
              </div>
              <div class="stat">
                <span class="name">Following</span>
                <span class="value">{{ user.following }}</span>
              </div>
            </div>
            <div class="user-socials">
              <div class="column">
                <div :class="{ social: true, unavailable: !user.location }">
                  <Icon name="mdi:map-marker" />
                  <span>{{ user.location ? user.location : "Not Available" }}</span>
                </div>
                <div :class="{ social: true, unavailable: !user.blog }">
                  <Icon name="mdi:link-variant" />
                  <a :href="user.blog">{{ user.blog ? user.blog : "Not Available" }}</a>
                </div>
              </div>
              <div class="column">
                <div :class="{ social: true, unavailable: !user.twitter_username }">
                  <Icon name="mdi:twitter" />
                  <a
                    :href="
                      user.twitter_username
                        ? `https://twitter.com/${user.twitter_username}`
                        : ''
                    "
                    >{{
                      user.twitter_username ? user.twitter_username : "Not Available"
                    }}</a
                  >
                </div>
                <div :class="{ social: true, unavailable: !user.company }">
                  <Icon name="mdi:building" />
                  <span>{{ user.company ? user.company : "Not Available" }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <span>Loading info from GitHub API...</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const themeStore = useThemeStore();

const inputField = ref();
const inputValue = ref();
const notFound = ref(false);

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

onMounted(() => {
  console.log(user.value);
});

const searchUser = async () => {
  console.log(inputValue.value);

  try {
    user.value = await $fetch(`https://api.github.com/users/${inputValue.value}`);
    notFound.value = false;
  } catch (error) {
    console.log(error);
    notFound.value = true;
  }
};

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

  @media screen and (max-width: 570px) {
    padding: 20px;
  }

  & div.container {
    width: 100%;
    max-width: 950px;

    & div.header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      @media screen and (max-width: 570px) {
        font-size: 0.8rem;
      }

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

    & form.search-container {
      box-sizing: border-box;
      background-color: var(--background-color-secondary);
      border-radius: 12px;
      height: 70px;
      display: flex;
      justify-content: space-between;
      padding: 10px;
      padding-left: 0px;
      align-items: center;
      font-size: 1.2rem;
      & input.sm {
        display: none;
      }

      @media screen and (max-width: 570px) {
        font-size: 1rem;
      }

      @media screen and (max-width: 490px) {
        font-size: 0.8rem;
      }

      @media screen and (max-width: 490px) {
        font-size: 0.8rem;
      }

      @media screen and (max-width: 400px) {
        font-size: 0.8rem;
        & input.sm {
          display: initial;
        }

        & input.lg {
          display: none;
        }
      }

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
        margin-right: 5px;

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
      height: fit-content;
      border-radius: 16px;
      margin-top: 26px;
      padding: 40px;
      box-sizing: border-box;

      @media screen and (max-width: 900px) {
        flex-direction: column;
        gap: 20px;
        // height: 660px;
      }

      @media screen and (max-width: 680px) {
        // height: 730px;
      }

      & div.profile-picture {
        width: 130px;
        min-width: 130px;
        height: 130px;
        min-height: 130px;
        border-radius: 100px;
        overflow: hidden;
        margin-right: 40px;

        & img {
          width: 100%;
        }
      }

      & div.info {
        display: flex;
        flex-direction: column;
        font-size: 1.15rem;
        width: 100%;
        min-width: 0;
        min-height: 0;

        @media screen and (max-width: 570px) {
          font-size: 0.9rem;
        }

        & div.user-info {
          display: flex;
          align-items: center;
          justify-content: space-between;

          @media screen and (max-width: 900px) {
            flex-direction: column;
            align-items: flex-start;
          }

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

          @media screen and (max-width: 488px) {
            text-align: center;
            align-items: center;
            padding: 20px;
            flex-direction: column;
            height: 300px;
          }

          & div.stat {
            display: flex;
            flex-direction: column;

            & span.value {
              font-size: 1.6rem;
              font-weight: 600;
            }
          }
        }

        & div.user-socials {
          display: flex;
          width: 100%;
          justify-content: space-between;

          & div.column {
            display: flex;
            flex-direction: column;
            gap: 12px;

            & div.social {
              display: flex;
              align-items: center;
              gap: 5px;

              @media screen and (max-width: 488px) {
                flex-direction: column;
                word-break: break-all;
                text-align: center;
              }

              & .icon {
                font-size: 1.6rem;
                min-width: 50px;
              }

              & a {
                all: unset;

                &:hover {
                  cursor: pointer;
                  text-decoration: underline;
                }
              }

              &.unavailable {
                opacity: 60%;
              }
            }
          }

          @media screen and (max-width: 680px) {
            flex-direction: column;
            gap: 12px;
          }
        }
      }
    }
  }
}
</style>
