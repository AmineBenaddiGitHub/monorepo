import { describe, expect, it, vi, beforeAll, afterAll } from "vitest";
import { appRouter } from "./router";

import { createContext } from "./context/context";

vi.mock("@faker-js/faker", () => ({
  faker: {
    person: {
      firstName: () => "John",
      lastName: () => "Doe",
      bio: () => "Lorem ipsum dolor sit amet",
      sex: () => "male",
      jobTitle: () => "Software Engineer",
      jobType: () => "Full-time",
    },
    phone: {
      number: () => "1234567890",
    },
  },
}));

describe("dataGenerator", () => {
  beforeAll(() => {
    vi.mock("./utils/client", () => ({
      client: {
        fakeData: {
          mutate: vi.fn(),
        },
      },
    }));
  });
  afterAll(() => {
    vi.resetAllMocks();
  });
  it("should generate data", async () => {
    const ctx = createContext({});
    const caller = appRouter.createCaller(ctx);
    const result = await caller.fakeData({
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
    expect(result).toEqual(
      Array.from({ length: 10 }, () => ({
        bio: "Lorem ipsum dolor sit amet",
        firstName: "John",
        jobTitle: "Software Engineer",
        jobType: "Full-time",
        lastName: "Doe",
        phoneNumber: "1234567890",
        sex: "male",
      }))
    );
  });
  it("should not generate data when not allowed input", async () => {
    const ctx = createContext({});
    const caller = appRouter.createCaller(ctx);
    try {
      await caller.fakeData({
        length: 10,
        properties: ["gender"],
      });
    } catch (error) {
      expect(JSON.parse(error.message).length).toEqual(1);
    }
  });
});
