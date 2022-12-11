import axios from 'axios';
import { getRegion } from '../../../../common/api/signup';

export interface regionType {
  region: string;
  code: number;
  places: placeType[];
}

export interface placeType {
  place: string;
  code: number;
}

interface responseType {
  code: string;
  n_code: number;
  codeDesc: string;
  codeName: string;
  pcode: string;
  n_pCode: number;
  registDt: string;
}

export const GetRegion = async () => {
  const regionArray: regionType[] = [];
  let currentCode = 0;
  let currentIndex = -1;
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/code/geo`);
  const { data } = response.data;
  data.forEach((each: responseType) => {
    if (currentCode !== each.n_pCode) {
      regionArray.push({
        region: each.codeName,
        code: each.n_code,
        places: [],
      });
      currentIndex += 1;
      currentCode = each.n_pCode;
    } else {
      regionArray[currentIndex].places.push(
        {
          place:each.codeName,
          code:each.n_code
        }
      );
    }
  });

  for(let i=0;i<3;i+=1){
    regionArray.unshift({
      region: 'blank',
      code: 0,
      places: [],
    });
    regionArray.push({
      region: 'blank',
      code: 0,
      places: [],
    });
  }
  regionArray.forEach((data)=>{
    for(let i=0;i<3;i+=1){
      data.places.unshift({
        place: 'blank',
        code: 0,
      });
      data.places.push({
        place: 'blank',
        code: 0,
      });
    }
  })

  return regionArray;
};


const region: regionType[] = [
  {
    region: 'blank',
    code: 0,
    places: [],
  },
  {
    region: 'blank',
    code: 1,
    places: [],
  },
  {
    region: 'blank',
    code: 2,
    places: [],
  },
  {
    region: '서울시',
    code: 101001,
    places: [
      { place: 'black', code: 0 },
      { place: 'black', code: 0 },
      { place: 'black', code: 0 },
      { place: '강남구', code: 101010 },
      { place: '강동구', code: 101020 },
      { place: '강북구', code: 101030 },
      { place: '강서구', code: 101040 },
      { place: '관악구', code: 101050 },
      { place: '광진구', code: 101060 },
      { place: '구로구', code: 101070 },
      { place: '금천구', code: 101080 },
      { place: 'black', code: 0 },
      { place: 'black', code: 0 },
      { place: 'black', code: 0 },
    ],
  },
  {
    region: '부산시',
    code: 101002,
    places: [
      { place: 'black', code: 0 },
      { place: 'black', code: 0 },
      { place: 'black', code: 0 },
      { place: '부산시', code: 101010 },
      { place: '부산시', code: 101020 },
      { place: '부산시', code: 101030 },
      { place: '부산시', code: 101040 },
      { place: '부산시', code: 101050 },
      { place: '부산시', code: 101060 },
      { place: '부산시', code: 101070 },
      { place: '부산시', code: 101080 },
      { place: 'black', code: 0 },
      { place: 'black', code: 0 },
      { place: 'black', code: 0 },
    ],
  },
  {
    region: '경기도',
    code: 101003,
    places: [
      { place: 'black', code: 0 },
      { place: 'black', code: 0 },
      { place: 'black', code: 0 },
      { place: '부산시', code: 101010 },
      { place: '평택시', code: 101020 },
      { place: '창원시', code: 101030 },
      { place: '창원시', code: 101040 },
      { place: '창원시', code: 101050 },
      { place: '창원시', code: 101060 },
      { place: '창원시', code: 101070 },
      { place: '창원시', code: 101080 },
      { place: 'black', code: 0 },
      { place: 'black', code: 0 },
      { place: 'black', code: 0 },
    ],
  },
  {
    region: '제주도',
    code: 101004,
    places: [
      { place: 'black', code: 0 },
      { place: 'black', code: 0 },
      { place: 'black', code: 0 },
      { place: '서귀포', code: 101010 },
      { place: '서귀포', code: 101020 },
      { place: '서귀포', code: 101030 },
      { place: '서귀포', code: 101040 },
      { place: '서귀포', code: 101050 },
      { place: '서귀포', code: 101060 },
      { place: '서귀포', code: 101070 },
      { place: '서귀포', code: 101080 },
      { place: 'black', code: 0 },
      { place: 'black', code: 0 },
      { place: 'black', code: 0 },
    ],
  },
  {
    region: '바보시',
    code: 101005,
    places: [
      { place: 'black', code: 0 },
      { place: 'black', code: 0 },
      { place: 'black', code: 0 },
      { place: '바보시', code: 101010 },
      { place: '바보시', code: 101020 },
      { place: '바보시', code: 101030 },
      { place: '바보시', code: 101040 },
      { place: '바보시', code: 101050 },
      { place: '바보시', code: 101060 },
      { place: '바보시', code: 101070 },
      { place: '바보시', code: 101080 },
      { place: 'black', code: 0 },
      { place: 'black', code: 0 },
      { place: 'black', code: 0 },
    ],
  },
  {
    region: '천안시',
    code: 101006,
    places: [
      { place: 'black', code: 0 },
      { place: 'black', code: 0 },
      { place: 'black', code: 0 },
      { place: '천안시', code: 101010 },
      { place: '천안시', code: 101020 },
      { place: '천안시', code: 101030 },
      { place: '천안시', code: 101040 },
      { place: '천안시', code: 101050 },
      { place: '천안시', code: 101060 },
      { place: '천안시', code: 101070 },
      { place: '천안시', code: 101080 },
      { place: 'black', code: 0 },
      { place: 'black', code: 0 },
      { place: 'black', code: 0 },
    ],
  },
  {
    region: '대전시',
    code: 101007,
    places: [
      { place: 'black', code: 0 },
      { place: 'black', code: 0 },
      { place: 'black', code: 0 },
      { place: '대전시', code: 101010 },
      { place: '대전시', code: 101020 },
      { place: '대전시', code: 101030 },
      { place: '대전시', code: 101040 },
      { place: '대전시', code: 101050 },
      { place: '대전시', code: 101060 },
      { place: '대전시', code: 101070 },
      { place: '대전시', code: 101080 },
      { place: 'black', code: 0 },
      { place: 'black', code: 0 },
      { place: 'black', code: 0 },
    ],
  },
  {
    region: 'blank',
    code: 3,
    places: [],
  },
  {
    region: 'blank',
    code: 4,
    places: [],
  },
  {
    region: 'blank',
    code: 5,
    places: [],
  },
];

export default region;
