import type { ComponentProps } from 'react'

export function Filter(props: ComponentProps<'svg'>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.5 0C15.3281 0 16 0.671858 16 1.5V14.5C16 15.3281 15.3281 16 14.5 16H1.5C0.671858 16 0 15.3281 0 14.5V1.5C0 0.671858 0.671858 0 1.5 0H14.5ZM14.5 1H1.5C1.22414 1 1 1.22414 1 1.5V14.5C1 14.7759 1.22414 15 1.5 15H14.5C14.7759 15 15 14.7759 15 14.5V1.5C15 1.22414 14.7759 1 14.5 1ZM6.99893 8.5C7.93115 8.49925 8.71437 9.1364 8.93676 9.99958L12.5 10C12.7761 10 13 10.2239 13 10.5C13 10.7416 12.8286 10.9432 12.6008 10.9898L12.5 11L8.93645 11.0018C8.71373 11.8638 7.93135 12.5 7 12.5C6.06818 12.5 5.28547 11.8632 5.06321 11.0009L3.5 11C3.22386 11 3 10.7761 3 10.5C3 10.2584 3.17139 10.0568 3.39923 10.0102L3.5 10L5.06318 9.99944C5.28536 9.13766 6.06776 8.50075 6.99893 8.5ZM6.99974 9.5C6.44756 9.50044 6 9.94814 6 10.5C6 11.0525 6.44748 11.5 7 11.5C7.54979 11.5 7.99557 11.0569 7.99997 10.5082C8 10.4973 8.00002 10.4946 8.00007 10.4918C7.99955 9.94689 7.55194 9.49956 6.99974 9.5ZM11 3.5C12.1048 3.5 13 4.39519 13 5.5004C12.9991 6.6051 12.1039 7.5 10.9989 7.5C10.0682 7.49925 9.28617 6.86299 9.06353 6.00189L3.5 6C3.22386 6 3 5.77614 3 5.5C3 5.25838 3.17139 5.05678 3.39923 5.01016L3.5 5L9.06287 5.00042C9.28466 4.13746 10.0677 3.5 11 3.5ZM11 4.5C10.4475 4.5 10 4.94748 10 5.5C10 6.05186 10.4476 6.49956 10.9993 6.5C11.5518 6.5 11.9994 6.05255 12 5.4998C11.9999 4.94737 11.5525 4.5 11 4.5Z"
        fill="#434A54"
      />
    </svg>
  )
}