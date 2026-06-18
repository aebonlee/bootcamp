// 프론트엔드 프로젝트 라이브 데모 레지스트리
// 각 항목: 실제 동작하는 컴포넌트(Component) + 그 소스코드(files, ?raw 로 로드)
import TodoApp from './apps/TodoApp.jsx'
import todoSrc from './apps/TodoApp.jsx?raw'
import PomodoroApp from './apps/PomodoroApp.jsx'
import pomoSrc from './apps/PomodoroApp.jsx?raw'
import MarkdownApp from './apps/MarkdownApp.jsx'
import mdSrc from './apps/MarkdownApp.jsx?raw'
import ProfileApp from './apps/ProfileApp.jsx'
import profileSrc from './apps/ProfileApp.jsx?raw'
import WeatherApp from './apps/WeatherApp.jsx'
import weatherSrc from './apps/WeatherApp.jsx?raw'
import KanbanApp from './apps/KanbanApp.jsx'
import kanbanSrc from './apps/KanbanApp.jsx?raw'

export const DEMOS = {
  'p-profile-cards': { Component: ProfileApp, files: [{ name: 'ProfileApp.jsx', lang: 'jsx', code: profileSrc }] },
  'p-todo': { Component: TodoApp, files: [{ name: 'TodoApp.jsx', lang: 'jsx', code: todoSrc }] },
  'p-pomodoro': { Component: PomodoroApp, files: [{ name: 'PomodoroApp.jsx', lang: 'jsx', code: pomoSrc }] },
  'p-markdown': { Component: MarkdownApp, files: [{ name: 'MarkdownApp.jsx', lang: 'jsx', code: mdSrc }] },
  'p-weather': { Component: WeatherApp, files: [{ name: 'WeatherApp.jsx', lang: 'jsx', code: weatherSrc }] },
  'p-kanban': { Component: KanbanApp, files: [{ name: 'KanbanApp.jsx', lang: 'jsx', code: kanbanSrc }] },
}

export const hasDemo = (id) => !!DEMOS[id]
