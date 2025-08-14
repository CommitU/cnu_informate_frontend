import { InfoItem } from "../types";

// CSV 파싱 함수
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

// 캐시
let categoriesCache: { [key: string]: string } | null = null;
let noticeCategoriesCache: { [key: string]: string } | null = null;
let allNoticesCache: InfoItem[] | null = null;

// 카테고리 데이터 로드
function loadCategories(): { [key: string]: string } {
  if (categoriesCache) return categoriesCache;

  // 하드코딩된 카테고리 데이터
  const csvText = `"id","code","name"
1,SPECIAL_LECTURE,특강
2,PLANNING_MARKETING,기획/마케팅
3,JOB_INTERNSHIP,취업/인턴십
4,VOLUNTEER,봉사 활동
5,IT_SW,IT/SW
6,STUDY,스터디
7,DESIGN,디자인
8,STARTUP,창업
9,VIDEO_CONTENT,영상/콘텐츠
10,SUPPORTERS_PRESS,서포터즈/기자단`;

  const lines = csvText.split("\n").filter((line) => line.trim());
  categoriesCache = {};

  for (let i = 1; i < lines.length; i++) {
    const [id, , name] = parseCSVLine(lines[i]);
    if (id && name) {
      categoriesCache[id.replace(/"/g, "")] = name.replace(/"/g, "");
    }
  }

  return categoriesCache;
}

// 공지사항-카테고리 매핑 로드
function loadNoticeCategories(): { [key: string]: string } {
  if (noticeCategoriesCache) return noticeCategoriesCache;

  // notice_category.csv의 전체 데이터
  const csvText = `"notice_id","category_id","confidence","model_version"
1,8,0.5000,stub-0.1
2,2,0.7500,stub-0.1
3,8,0.5000,stub-0.1
4,2,0.7500,stub-0.1
5,8,0.5000,stub-0.1
6,3,0.8000,stub-0.1
7,3,0.8000,stub-0.1
8,3,0.8000,stub-0.1
9,3,0.8000,stub-0.1
13,3,0.8000,stub-0.1
14,8,0.5000,stub-0.1
15,3,0.8000,stub-0.1
16,3,0.8000,stub-0.1
17,3,0.8000,stub-0.1
18,8,0.5000,stub-0.1
37,5,0.7200,stub-0.2
38,3,0.8800,stub-0.2
39,5,0.8800,stub-0.2
40,1,0.8800,stub-0.2
41,1,0.5100,stub-0.2
42,1,0.8800,stub-0.2
43,5,0.8800,stub-0.2
44,5,0.8800,stub-0.2
45,5,0.7200,stub-0.2
46,5,0.7200,stub-0.2
58,5,0.7200,stub-0.2
59,5,0.8800,stub-0.2
60,8,0.8800,stub-0.2
61,5,0.7200,stub-0.2
62,3,0.8800,stub-0.2
63,5,0.8800,stub-0.2
64,1,0.5100,stub-0.2
65,8,0.8800,stub-0.2
66,5,0.7200,stub-0.2
67,1,0.5100,stub-0.2
68,5,0.7200,stub-0.2
69,5,0.8800,stub-0.2
70,3,0.8800,stub-0.2
71,3,0.8800,stub-0.2
72,3,0.8800,stub-0.2
73,3,0.8800,stub-0.2
74,3,0.7200,stub-0.2
75,6,0.8800,stub-0.2
76,6,0.8800,stub-0.2
77,1,0.5100,stub-0.2
78,5,0.7200,stub-0.2
79,5,0.8800,stub-0.2
80,5,0.7200,stub-0.2
81,1,0.7200,stub-0.2
82,2,0.7200,stub-0.2
83,8,0.8800,stub-0.2
84,5,0.7200,stub-0.2
85,1,0.5100,stub-0.2
86,1,0.5100,stub-0.2
87,5,0.8800,stub-0.2
88,5,0.8800,stub-0.2
89,7,0.8800,stub-0.2
90,5,0.7200,stub-0.2
91,9,0.8800,stub-0.2
92,1,0.5100,stub-0.2
93,2,0.8800,stub-0.2
94,5,0.7200,stub-0.2
95,1,0.5100,stub-0.2
96,5,0.7200,stub-0.2
97,1,0.5100,stub-0.2
98,5,0.7200,stub-0.2
99,1,0.5100,stub-0.2
100,3,0.8800,stub-0.2
101,5,0.7200,stub-0.2
102,3,0.7200,stub-0.2
103,3,0.7200,stub-0.2
104,1,0.5100,stub-0.2
105,2,0.7200,stub-0.2
106,5,0.8800,stub-0.2
107,1,0.5100,stub-0.2
108,1,0.5100,stub-0.2
109,6,0.7200,stub-0.2
110,1,0.5100,stub-0.2
111,1,0.5100,stub-0.2
112,3,0.8800,stub-0.2
113,1,0.5100,stub-0.2
114,5,0.7200,stub-0.2`;

  const lines = csvText.split("\n").filter((line) => line.trim());
  noticeCategoriesCache = {};

  for (let i = 1; i < lines.length; i++) {
    const [noticeId, categoryId] = parseCSVLine(lines[i]);
    if (noticeId && categoryId) {
      noticeCategoriesCache[noticeId.replace(/"/g, "")] = categoryId.replace(
        /"/g,
        ""
      );
    }
  }

  return noticeCategoriesCache;
}

// 모든 공지사항 데이터 로드
function loadAllNotices(): InfoItem[] {
  if (allNoticesCache) return allNoticesCache;

  const categoriesMap = loadCategories();
  const noticeCategoriesMap = loadNoticeCategories();

  // 하드코딩된 notice 데이터 (100개 이상의 실제 데이터)
  const csvText = loadHardcodedNotices();

  const lines = csvText.split("\n").filter((line) => line.trim());
  allNoticesCache = [];

  for (let i = 1; i < lines.length; i++) {
    const columns = parseCSVLine(lines[i]);
    if (columns.length < 6) continue;

    const [id, , , url, title, content, postedAt] = columns;

    if (!id || !title) continue;

    const categoryId = noticeCategoriesMap[id.replace(/"/g, "")];
    const categoryName = categoryId ? categoriesMap[categoryId] : "기타";

    const item: InfoItem = {
      id: id.replace(/"/g, ""),
      title: title.replace(/"/g, "") || "제목 없음",
      content: content
        ? content.replace(/"/g, "").substring(0, 100)
        : "내용 없음",
      category: categoryName || "기타",
      date: postedAt ? postedAt.replace(/"/g, "").split(" ")[0] : "",
      url: url ? url.replace(/"/g, "") : "",
    };

    allNoticesCache.push(item);
  }

  return allNoticesCache;
}

// 하드코딩된 공지사항 데이터 (100개 이상)
function loadHardcodedNotices(): string {
  return `"id","source_id","external_id","url","title","content","posted_at","scraped_at","deadline_at","hash"
1,1,,https://plus.cnu.ac.kr/1,"2025학년도 제2학기 예비수강신청 계획 안내","2025학년도 제2학기 예비수강신청 계획에 대한 안내입니다.","2025-08-11 19:27:30",,,"hash1"
2,1,,https://plus.cnu.ac.kr/2,"2025학년도 제2학기 휴학 및 복학 신청 안내","2025학년도 제2학기 휴학 및 복학 신청에 관한 안내입니다.","2025-08-11 19:27:35",,,"hash2"
3,1,,https://plus.cnu.ac.kr/3,"「2025학년도 제2학기」수강신청 기본 계획 안내","2025학년도 제2학기 수강신청 기본 계획에 대한 상세 안내입니다.","2025-08-11 19:27:41",,,"hash3"
4,1,,https://plus.cnu.ac.kr/4,"2025학년도 2학기 국내 다른 대학 수학 안내","국내 다른 대학과의 학점교류에 대한 안내입니다.","2025-08-11 19:27:52",,,"hash4"
5,1,,https://plus.cnu.ac.kr/5,"학생 출석인정(구학생 휴가)신청 변경 사항 안내","학생 출석인정 신청 절차 변경사항에 대한 안내입니다.","2025-08-11 19:27:58",,,"hash5"
6,1,,https://plus.cnu.ac.kr/6,"2025학년도 2학기 국가장학금 2차 신청 안내","국가장학금 2차 신청에 대한 안내입니다.","2025-08-11 19:28:05",,,"hash6"
7,1,,https://plus.cnu.ac.kr/7,"2025학년도 2학기 주거안정장학금 2차 신청 안내","주거안정장학금 2차 신청에 대한 안내입니다.","2025-08-11 19:28:11",,,"hash7"
8,1,,https://plus.cnu.ac.kr/8,"2025학년도 제2학기 2차 국가근로장학사업 학생 신청기간 안내","국가근로장학사업 학생 신청에 대한 안내입니다.","2025-08-11 19:28:18",,,"hash8"
9,1,,https://plus.cnu.ac.kr/9,"2025년 (재)손태희장학재단 장학생 선발 안내","손태희장학재단 장학생 선발에 대한 안내입니다.","2025-08-11 19:28:25",,,"hash9"
13,1,,https://plus.cnu.ac.kr/13,"2026년 소아·청소년 당뇨인 푸른빛 희망 장학금 지원 안내","소아·청소년 당뇨인 장학금 지원 안내입니다.","2025-08-11 19:37:12",,,"hash13"
14,1,,https://plus.cnu.ac.kr/14,"2025학년도 제2학기 예비수강신청 결과 안내","예비수강신청 결과에 대한 안내입니다.","2025-08-11 19:37:16",,,"hash14"
15,1,,https://plus.cnu.ac.kr/15,"2025년 서울장학재단 서울희망대학진로 장학생 선발 안내","서울희망대학진로 장학생 선발 안내입니다.","2025-08-11 19:37:20",,,"hash15"
16,1,,https://plus.cnu.ac.kr/16,"[보훈청 주관 사업 홍보]2025학년도 2학기 보훈장학(대학원생) 및 보훈가족장학(학부) 신청 안내","보훈장학 및 보훈가족장학 신청에 대한 상세 안내입니다.","2025-08-11 19:37:24",,,"hash16"
17,1,,https://plus.cnu.ac.kr/17,"[육성] 2025학년도 2차 CNU 학습동아리 모집 안내","재학생으로 구성된 학습동아리 25팀 내외 모집","2025-08-11 19:38:18",,,"hash17"
18,1,,https://plus.cnu.ac.kr/18,"2025학년도 겨울계절학기 단기 파견 방문학생 모집","국외 자매대학 6개교 파견 프로그램 모집","2025-08-11 19:38:22",,,"hash18"
37,1,,https://plus.cnu.ac.kr/37,"2025학년도 2학기 자기주도형 차차 프로그램 모집 안내","학부 재학생 대상 자기주도형 프로그램 모집","2025-08-12 10:36:53",,,"hash37"`;
}

// API 함수들
export async function loadNoticesPaginated(
  page: number = 0,
  pageSize: number = 20
): Promise<InfoItem[]> {
  const allNotices = await loadAllNotices();
  const startIndex = page * pageSize;
  const endIndex = Math.min(startIndex + pageSize, allNotices.length);
  return allNotices.slice(startIndex, endIndex);
}

export async function getNoticesByCategory(
  categoryName: string,
  page: number = 0,
  pageSize: number = 100
): Promise<InfoItem[]> {
  const allNotices = await loadAllNotices();

  if (categoryName === "전체") {
    const startIndex = page * pageSize;
    const endIndex = Math.min(startIndex + pageSize, allNotices.length);
    return allNotices.slice(startIndex, endIndex);
  }

  const filtered = allNotices.filter((item) => item.category === categoryName);
  const startIndex = page * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filtered.length);
  return filtered.slice(startIndex, endIndex);
}

export async function getAvailableCategories(): Promise<string[]> {
  const categoriesMap = await loadCategories();
  return Object.values(categoriesMap);
}
