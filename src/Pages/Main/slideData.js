import { MAIN_URL } from "config.js";

const SLIDE_DATA = [
  {
    id: 1,
    title: "지금 뜨는 컨텐츠",
    url: `${MAIN_URL}order-by=-hot&limit=26&category=movie&category=drama&genre=Action&genre=Adventure`,
  },
  {
    id: 2,
    title: "어드벤쳐 드라마 & 영화",
    url: `${MAIN_URL}limit=26&category=movie&category=drama&genre=Adventure`,
  },
  {
    id: 3,
    title: "액션 드라마&영화",
    url: `${MAIN_URL}limit=26&category=movie&category=drama&genre=Action`,
  },
  {
    id: 4,
    title: "코메디 드라마 & 영화",
    url: `${MAIN_URL}limit=26&category=movie&category=drama&genre=Comedy`,
  },
];

export default SLIDE_DATA;
