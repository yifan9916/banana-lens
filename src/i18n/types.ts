import { MessageKeys } from 'next-intl';

export type Dictionary = IntlMessages;
export type DictionaryKeys = MessageKeys<Dictionary, keyof Dictionary>;
