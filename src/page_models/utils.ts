import { PageType } from "@/types";
import universeModel from "./universeModel";

export interface PageModelMap {
    universe: typeof universeModel;
}

export type PageModelFromPageType<T extends PageType> = PageModelMap[T];

export const pageModelMap: PageModelMap = {
    universe: universeModel,
};
