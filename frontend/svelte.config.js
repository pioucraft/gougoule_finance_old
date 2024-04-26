import adapter from "svelte-adapter-bun";

const config = {
  kit: {
    adapter: adapter({
		development: process.env.DEVELOPMENT_MODE == "true"
	}),
  }
};

export default config;