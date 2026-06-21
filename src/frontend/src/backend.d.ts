import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface FootprintEstimate {
    moneySavedPerYear: number;
    category: Category;
    co2KgPerYear: number;
}
export type OffsetOptionId = bigint;
export interface FootprintInput {
    value: number;
    unit: string;
    category: Category;
}
export interface OffsetPurchase {
    totalCo2OffsetKg: number;
    optionId: OffsetOptionId;
    purchasedAt: bigint;
    totalCostUsd: number;
    quantity: bigint;
}
export interface OffsetOption {
    id: OffsetOptionId;
    name: string;
    description: string;
    category: OffsetCategory;
    iconUrl: string;
    co2OffsetKg: number;
    costUsd: number;
}
export type ChallengeId = bigint;
export interface ConversionFactor {
    unit: string;
    moneySavedPerUnit: number;
    category: Category;
    co2KgPerUnit: number;
}
export interface UserProgress {
    daysCompleted: bigint;
    challengeId: ChallengeId;
    lastCheckIn?: bigint;
    currentStreak: bigint;
}
export interface Challenge {
    id: ChallengeId;
    durationDays: bigint;
    status: ChallengeStatus;
    title: string;
    co2ReductionKg: number;
    description: string;
    participantCount: bigint;
    category: string;
}
export enum Category {
    transportation = "transportation",
    diet = "diet",
    homeEnergy = "homeEnergy",
    shopping = "shopping"
}
export enum ChallengeStatus {
    active = "active",
    upcoming = "upcoming",
    completed = "completed"
}
export enum OffsetCategory {
    treePlanting = "treePlanting",
    oceanCleanup = "oceanCleanup",
    communitySolar = "communitySolar",
    wildlifeConservation = "wildlifeConservation"
}
export interface backendInterface {
    calculateFootprint(inputs: Array<FootprintInput>): Promise<Array<FootprintEstimate>>;
    calculateTotals(estimates: Array<FootprintEstimate>): Promise<{
        totalSavings: number;
        totalCo2: number;
    }>;
    getChallenge(id: ChallengeId): Promise<Challenge | null>;
    getChallengesByStatus(status: ChallengeStatus): Promise<Array<Challenge>>;
    getConversionFactors(): Promise<Array<ConversionFactor>>;
    getDefaultProgress(challengeId: ChallengeId): Promise<UserProgress>;
    getOffsetOption(id: OffsetOptionId): Promise<OffsetOption | null>;
    getOffsetOptionsByCategory(category: OffsetCategory): Promise<Array<OffsetOption>>;
    listChallenges(): Promise<Array<Challenge>>;
    listOffsetOptions(): Promise<Array<OffsetOption>>;
    simulatePurchase(optionId: OffsetOptionId, quantity: bigint): Promise<OffsetPurchase | null>;
}
