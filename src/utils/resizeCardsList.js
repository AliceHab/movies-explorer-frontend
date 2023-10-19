import {
  DESKTOP_SCREEN_WIDTH,
  TABLET_SCREEN_WIDTH,
  DESKTOP_CARD_NUMBER,
  TABLET_CARD_NUMBER,
  MOBILE_CARD_NUMBER,
  DESKTOP_ADD_MORE_CARD,
  TABLED_AND_MOBILE_ADD_MORE_CARD,
} from './constants';

export function cardsToRender(pageWidth, setItemsToShow) {
  if (pageWidth > DESKTOP_SCREEN_WIDTH) {
    setItemsToShow(DESKTOP_CARD_NUMBER);
  } else if (pageWidth >= TABLET_SCREEN_WIDTH) {
    setItemsToShow(TABLET_CARD_NUMBER);
  } else {
    setItemsToShow(MOBILE_CARD_NUMBER);
  }
}

export function cardsToAddMore(pageWidth, setItemsToAddMore, itemsToShow, setItemsToShow) {
  let newItemsToAddMore;
  if (pageWidth > DESKTOP_SCREEN_WIDTH) {
    newItemsToAddMore = DESKTOP_ADD_MORE_CARD;
  } else if (pageWidth >= TABLET_SCREEN_WIDTH) {
    newItemsToAddMore = TABLED_AND_MOBILE_ADD_MORE_CARD;
  } else {
    newItemsToAddMore = TABLED_AND_MOBILE_ADD_MORE_CARD;
  }
  setItemsToAddMore(newItemsToAddMore);

  // Заполняем пустоту в ряду, если появляется разрыв
  const remainder = itemsToShow % newItemsToAddMore;
  if (remainder > 0) {
    setItemsToShow(itemsToShow + newItemsToAddMore - remainder);
  }
}
