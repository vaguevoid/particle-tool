import { describe, expect, it } from "vitest";
import { getPath } from "../models/entry";

describe("entry", () => {
	describe("getPath", () => {
		it("does not add a delimiter if only one entry in path", () => {
			expect(getPath("", "new-element")).toEqual("new-element");
		});

		it("adds a delimiter if the path already has entries", () => {
			expect(getPath("element", "new-element")).toEqual("element.new-element");
		});
	});
});
