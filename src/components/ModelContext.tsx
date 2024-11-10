import React from 'react';
import { pageModelMap, PageModelFromPageType, PageModelMap } from '@/page_models/utils';
import { PageType } from '@/types';
import { ValueOfKey } from '@/types/utils';

type PageModelContext = {
    [K in keyof PageModelMap]?: React.Context<PageModelMap[K]>;
};
const pageMapModelContext: PageModelContext = {};

type PageModelContextKey<K> = K extends PageType
    ? K extends keyof PageModelContext ? K : never
    : never;

type ModelContext<K> = ValueOfKey<PageModelContext, PageModelContextKey<K>>;

export const modelContextCreator = <T extends PageType>(pageType: T):
{
    ModelContext: NonNullable<ModelContext<T>>,
    pageModel: PageModelFromPageType<T>,
} => {
    const pageModel = pageModelMap[pageType];
    if (!pageMapModelContext[pageType]) {
        const modelContext = React.createContext<PageModelFromPageType<T>>(pageModel);
        pageMapModelContext[pageType] = modelContext;
    } else {
        console.warn('Model context alrPageTypeMap2PageModeleady exists for page type:', pageType);
    }
    const ModelContext = pageMapModelContext[pageType]!;
    return {
        ModelContext,
        pageModel,
    };
};

export const useModelContext = <T extends PageType>(pageType: T): PageModelFromPageType<T> => {
    if(!pageMapModelContext[pageType]) {
        throw new Error(`Model context does not exist for page type: ${pageType}`);
    }
    const pageContext = pageMapModelContext[pageType]!;
    return React.useContext(pageContext);
};
