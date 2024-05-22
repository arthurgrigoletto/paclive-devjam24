import type { ComponentProps } from 'react'

export function Chart(props: ComponentProps<'svg'>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.37232 1.77388C9.31974 0.785677 8.50125 0 7.5 0C6.46482 0 5.625 0.839822 5.625 1.875C5.625 2.23101 5.72433 2.56391 5.89677 2.84749L2.51107 6.98573C2.31244 6.91407 2.09827 6.875 1.875 6.875C0.839822 6.875 0 7.71482 0 8.75C0 9.78518 0.839822 10.625 1.875 10.625C2.91018 10.625 3.75 9.78518 3.75 8.75C3.75 8.39402 3.65069 8.06115 3.47827 7.77758L6.86401 3.6393C7.06261 3.71094 7.27676 3.75 7.5 3.75C8.12513 3.75 8.67903 3.44373 9.01974 2.97312L16.2526 5.10005C16.3047 6.08875 17.1234 6.875 18.125 6.875C19.1602 6.875 20 6.03518 20 5C20 3.96482 19.1602 3.125 18.125 3.125C17.5003 3.125 16.9467 3.43089 16.6059 3.90101L9.37232 1.77388ZM17.5217 4.83634C17.5231 4.83191 17.5245 4.82746 17.5258 4.82298C17.527 4.81879 17.5282 4.81459 17.5294 4.81039C17.6098 4.55808 17.8463 4.375 18.125 4.375C18.4698 4.375 18.75 4.65518 18.75 5C18.75 5.34482 18.4698 5.625 18.125 5.625C17.7802 5.625 17.5 5.34482 17.5 5C17.5 4.94338 17.5076 4.88851 17.5217 4.83634ZM6.875 1.875C6.875 1.53018 7.15518 1.25 7.5 1.25C7.84482 1.25 8.125 1.53018 8.125 1.875C8.125 2.21982 7.84482 2.5 7.5 2.5C7.15518 2.5 6.875 2.21982 6.875 1.875ZM1.875 8.125C1.53018 8.125 1.25 8.40518 1.25 8.75C1.25 9.09482 1.53018 9.375 1.875 9.375C2.21982 9.375 2.5 9.09482 2.5 8.75C2.5 8.40518 2.21982 8.125 1.875 8.125ZM11.25 7.5H8.75C8.05982 7.5 7.5 8.05982 7.5 8.75V18.75H6.25V15C6.25 14.3098 5.69018 13.75 5 13.75H2.5C1.80982 13.75 1.25 14.3098 1.25 15V18.75H0.625C0.279822 18.75 0 19.0298 0 19.375C0 19.7202 0.279822 20 0.625 20H1.875H5.625H8.125H11.875H14.375H18.125H19.375C19.7202 20 20 19.7202 20 19.375C20 19.0298 19.7202 18.75 19.375 18.75H18.75V12.5C18.75 11.8098 18.1902 11.25 17.5 11.25H15C14.3098 11.25 13.75 11.8098 13.75 12.5V18.75H12.5V8.75C12.5 8.05982 11.9402 7.5 11.25 7.5ZM17.5 12.5V18.75H15V12.5H17.5ZM11.25 8.75H8.75V18.75H11.25V8.75ZM5 15V18.75H2.5V15H5Z"
        fill="#434A54"
      />
    </svg>
  )
}
