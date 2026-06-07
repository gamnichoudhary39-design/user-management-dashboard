import { mount } from "@vue/test-utils";
import AddUserModal from "../src/components/AddUserModal.vue";
import { describe, it, expect } from "vitest";

describe("AddUserModal", () => {

  it("renders heading correctly", () => {
    const wrapper = mount(AddUserModal, {
      global: {
        mocks: {
          $t: (msg) => msg,
        },
      },
    });

    expect(wrapper.text()).toContain("Add New User");
  });

  it("shows save button", () => {
    const wrapper = mount(AddUserModal, {
      global: {
        mocks: {
          $t: (msg) => msg,
        },
      },
    });

    expect(wrapper.find("button").exists()).toBe(true);
  });

});