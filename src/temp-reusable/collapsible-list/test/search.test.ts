import { describe, expect, it } from "vitest";
import { getMatchingPaths, queryRegexp } from "../models/search";

describe("search", () => {
	describe("queryRegex", () => {
		it("matches same string", () => {
			const regex = queryRegexp("abcde");
			expect("abcde".match(regex)).toBeTruthy();
		});

		it("matches same character order", () => {
			const regex = queryRegexp("abcde");
			expect(
				"garbage prefix a b c intermission d e garbage suffix".match(regex),
			).toBeTruthy();
		});

		it("does not match different character order", () => {
			const regex = queryRegexp("abcde");
			expect("abced".match(regex)).toBeFalsy();
		});
	});

	describe("getMatchingPaths", () => {
		it("returns paths for all matching labels", () => {
			const list = [
				{
					label: "abcde",
				},
				{
					label: "ignored",
					list: [
						{
							label: "no match",
						},
					],
				},
				{
					label: "nested match",
					list: [
						{
							label: "abcde",
						},
						{
							label: "ignored",
						},
						{
							label: "double-nested",
							list: [
								{
									label: "abcde",
								},
							],
						},
					],
				},
			];
			const matches = [
				"abcde",
				"nested match.abcde",
				"nested match.double-nested.abcde",
			];
			expect(getMatchingPaths("abcde", list)).toEqual(matches);
		});
	});
});
