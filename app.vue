<template>
  <div>
    <div class="app">
      <div class="container">
        <div class="header">
          <h1 class="title">devfinder</h1>
          <div @click="changeTheme" class="theme-button">
            <span>{{ themeStore.dark ? 'DARK' : 'LIGHT'}}</span>
            <Icon v-if="themeStore.dark" name="uil:moon" />
            <Icon v-else name="uil:sun" />
          </div>
        </div>
        <div @click="focusInput" class="search-container">
          <Icon name="ph:magnifying-glass-bold" />
          <input ref="inputField" type="text" name="" id="" placeholder="Search GitHub username...">
          <button>Search</button>
        </div>
        <div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const themeStore = useThemeStore();

const inputField = ref();

const { data: user } = await useFetch('https://api.github.com/users/octocat');

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
        transition: background-color .2s ease-in-out, color .2s ease-in-out;

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
  }
}

@media screen and (max-width: 480px) {
  div.app {
    font-size: .8rem;
  }
}

</style>
