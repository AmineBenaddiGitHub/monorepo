import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./router";
import * as clientModule from "./utils/client";

vi.mock("./utils/client", () => ({
  client: {
    fakeData: {
      mutate: vi.fn(),
    },
  },
}));

describe("generateUsers", () => {
  it("calling client once", async () => {
    const spy = vi.spyOn(clientModule.client.fakeData, "mutate");

    const caller = appRouter.createCaller({});

    await caller.generateUsers({
      length: 10,
      properties: [
        "bio",
        "firstName",
        "lastName",
        "sex",
        "jobTitle",
        "jobType",
        "phoneNumber",
      ],
    });

    expect(spy).toHaveBeenCalled(1);
  });

  it("no call when wrong payload", async () => {
    const spy = vi.spyOn(clientModule.client.fakeData, "mutate");

    const caller = appRouter.createCaller({});
    try {
      await caller.generateUsers({
        length: 10,
        properties: ["test"],
      });
    } catch (err) {}

    expect(spy).not.toHaveBeenCalled(1);
  });
});
