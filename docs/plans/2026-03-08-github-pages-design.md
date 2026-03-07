# GitHub Pages 배포 설계 메모

## 배경

이 저장소는 단일 `index.html`로 실행되는 정적 프로젝트다. 사용자는 README에 항상 보이는 공개 주소를 두고 싶어 하고, 기본 GitHub Pages 주소 사용에 동의했다.

## 목표

- 저장소를 기본 GitHub Pages 주소로 공개한다.
- README에서 데모 주소를 바로 찾을 수 있게 한다.
- 정적 HTML 파일이 Jekyll 처리 없이 그대로 배포되게 한다.

## 접근안

### 1. GitHub Pages만 사용

- 장점: 현재 공개 저장소와 바로 연결된다.
- 장점: README의 링크와 실제 호스팅 주소가 같은 서비스 안에 있다.
- 단점: 배포 옵션은 Vercel이나 Cloudflare Pages보다 단순하다.

### 2. Vercel 사용

- 장점: 배포 UI와 프리뷰가 좋다.
- 단점: 지금 프로젝트에는 설정이 더 늘어난다.

### 3. Cloudflare Pages 사용

- 장점: 정적 사이트 운영 기능이 좋다.
- 단점: GitHub Pages보다 설정이 더 필요하다.

## 선택

1번을 선택한다. 목적이 "README에 항상 보이는 주소"인 만큼 현재 저장소와 직접 연결되는 GitHub Pages가 가장 단순하다.

## 세부 설계

- GitHub Pages 소스는 `main` 브랜치의 `/`로 설정한다.
- 공개 주소는 `https://jinhyuk9714.github.io/voxel-castle-diorama/`를 사용한다.
- 저장소 루트에 `.nojekyll` 파일을 추가한다.
- README의 링크 섹션에 `데모` 항목을 추가한다.
