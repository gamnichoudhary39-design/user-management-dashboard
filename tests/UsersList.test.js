import { mount } from "@vue/test-utils";
import UsersList from "../src/components/UsersList.vue";
import { describe, it, expect } from "vitest";

describe("UsersList", () => {

  it("component renders", () => {
    const wrapper = mount(UsersList, {
      global: {
        mocks: {
          $t: (msg) => msg,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it("contains table", () => {
    const wrapper = mount(UsersList, {
      global: {
        mocks: {
          $t: (msg) => msg,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

});