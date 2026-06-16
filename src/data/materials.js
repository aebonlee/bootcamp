// 챕터별 원본 교재(PDF) 파일명 — 저장소 docs/pdf/ 에 보관
// GitHub 저장소에서 직접 열람 가능
const REPO = 'https://github.com/aebonlee/bootcamp/blob/main/docs/pdf'

export const PDF_FILE = {
  'react-01': '01장_JSX_문법과_React_기본_개념.pdf',
  'react-02': '02장_Props와_State_이해.pdf',
  'react-03': '03장_UI_디자인_및_구현.pdf',
  'react-04': '04장_상태관리_및_데이터_연동.pdf',
  'react-05': '05장_API_연동과_인증_프로세스_구현.pdf',
  'react-06': '06장_리액트_프로젝트_설계.pdf',
  'react-07': '07장_프로젝트_리팩터링과_배포.pdf',
  'react-08': '08장_프로젝트_실무_적용.pdf',
  'ai-01': 'chapter1_fastapi_huggingface.pdf',
  'ai-02': 'chapter2_transformers.pdf',
  'ai-03': 'chapter3_nlp_web_services.pdf',
  'ai-04': 'chapter4_image_generation.pdf',
  'ai-05': 'chapter5_audio_ai_web_project.pdf',
  'ai-06': 'chapter6_cv_web_services.pdf',
  'ai-07': 'chapter7_multimodal.pdf',
  'ai-08': 'chapter8_deploy_ops.pdf',
}

export const pdfName = (chapterId) => PDF_FILE[chapterId] || null
export const pdfUrl = (chapterId) => {
  const f = PDF_FILE[chapterId]
  return f ? `${REPO}/${encodeURIComponent(f)}` : null
}
