export interface CCTVCamera {
  id: string
  name: string
  coords: [number, number]
  streamUrl: string
}

export const CCTV_CAMERAS: CCTVCamera[] = [
  { id: 'cam-1', name: 'Камера 01-ГБ — ул. Гарибальди, 22', coords: [55.6708, 37.5456], streamUrl: 'https://www.youtube.com/embed/kYvH5m0-X94?autoplay=1&mute=1&controls=0&modestbranding=1&live=1' },
  { id: 'cam-2', name: 'Камера 02-ГБ — ул. Гарибальди, 24', coords: [55.6702, 37.5447], streamUrl: 'https://www.youtube.com/embed/1-iVe44XgVI?autoplay=1&mute=1&controls=0&modestbranding=1&live=1' },
  { id: 'cam-3', name: 'Камера 03-ГБ — ул. Гарибальди, 22 к.2', coords: [55.6709, 37.5443], streamUrl: 'https://www.youtube.com/embed/hK-J4Tix5XQ?autoplay=1&mute=1&controls=0&modestbranding=1&live=1' },
  { id: 'cam-4', name: 'Камера 04-ГБ — Архитектурный въезд', coords: [55.6695, 37.5459], streamUrl: 'https://www.youtube.com/embed/lZJ7Ue3zO1Y?autoplay=1&mute=1&controls=0&modestbranding=1&live=1' },
  
  { id: 'cam-5', name: 'Камера 11-ЛС — Лосевская ул., 3А', coords: [55.8755, 37.7171], streamUrl: 'https://www.youtube.com/embed/kYvH5m0-X94?autoplay=1&mute=1&controls=0&modestbranding=1&live=1' },
  { id: 'cam-6', name: 'Камера 12-ЛС — Лосевский сквер', coords: [55.8751, 37.7180], streamUrl: 'https://www.youtube.com/embed/1-iVe44XgVI?autoplay=1&mute=1&controls=0&modestbranding=1&live=1' },
  { id: 'cam-7', name: 'Камера 13-ЛС — Перекресток Проектируемого пр.', coords: [55.8758, 37.7182], streamUrl: 'https://www.youtube.com/embed/hK-J4Tix5XQ?autoplay=1&mute=1&controls=0&modestbranding=1&live=1' },
  
  { id: 'cam-8', name: 'Камера 21-ГЗ — ул. Газопровод, 7', coords: [55.5905, 37.6041], streamUrl: 'https://www.youtube.com/embed/lZJ7Ue3zO1Y?autoplay=1&mute=1&controls=0&modestbranding=1&live=1' },
  { id: 'cam-9', name: 'Камера 22-ГЗ — ул. Газопровод, 7 к.1', coords: [55.5898, 37.6049], streamUrl: 'https://www.youtube.com/embed/kYvH5m0-X94?autoplay=1&mute=1&controls=0&modestbranding=1&live=1' },
  { id: 'cam-10', name: 'Камера 23-ГЗ — Въезд автостоянка ЗСГО', coords: [55.5901, 37.6038], streamUrl: 'https://www.youtube.com/embed/1-iVe44XgVI?autoplay=1&mute=1&controls=0&modestbranding=1&live=1' },
  
  { id: 'cam-11', name: 'Камера 31-ТН — Тайнинская улица, 16/2', coords: [55.8758, 37.6744], streamUrl: 'https://www.youtube.com/embed/hK-J4Tix5XQ?autoplay=1&mute=1&controls=0&modestbranding=1&live=1' },
  { id: 'cam-12', name: 'Камера 32-ТН — Тайнинская, детская площадка', coords: [55.8752, 37.6755], streamUrl: 'https://www.youtube.com/embed/lZJ7Ue3zO1Y?autoplay=1&mute=1&controls=0&modestbranding=1&live=1' },
  
  { id: 'cam-13', name: 'Камера 41-ФР — 2-я Фрезерная ул., 6', coords: [55.7338, 37.7475], streamUrl: 'https://www.youtube.com/embed/kYvH5m0-X94?autoplay=1&mute=1&controls=0&modestbranding=1&live=1' },
  { id: 'cam-14', name: 'Камера 42-ФР — 2-я Фрезерная ул. к.2', coords: [55.7332, 37.7468], streamUrl: 'https://www.youtube.com/embed/1-iVe44XgVI?autoplay=1&mute=1&controls=0&modestbranding=1&live=1' },
  
  { id: 'cam-15', name: 'Камера 51-БП — Булатниковский пр-д, 2В/3', coords: [55.5807, 37.6491], streamUrl: 'https://www.youtube.com/embed/hK-J4Tix5XQ?autoplay=1&mute=1&controls=0&modestbranding=1&live=1' },
  { id: 'cam-16', name: 'Камера 52-БП — Булатниковский, сквер', coords: [55.5801, 37.6500], streamUrl: 'https://www.youtube.com/embed/lZJ7Ue3zO1Y?autoplay=1&mute=1&controls=0&modestbranding=1&live=1' },
  
  { id: 'cam-17', name: 'Камера 61-АТ — ул. Артековская, 7/6', coords: [55.6267, 37.6202], streamUrl: 'https://www.youtube.com/embed/kYvH5m0-X94?autoplay=1&mute=1&controls=0&modestbranding=1&live=1' },
  { id: 'cam-18', name: 'Камера 62-АТ — ул. Артековская, 7 к.5', coords: [55.6261, 37.6210], streamUrl: 'https://www.youtube.com/embed/1-iVe44XgVI?autoplay=1&mute=1&controls=0&modestbranding=1&live=1' },
  { id: 'cam-19', name: 'Камера 63-АТ — Въезд Exon-ЗСГО', coords: [55.6265, 37.6198], streamUrl: 'https://www.youtube.com/embed/hK-J4Tix5XQ?autoplay=1&mute=1&controls=0&modestbranding=1&live=1' },
]
