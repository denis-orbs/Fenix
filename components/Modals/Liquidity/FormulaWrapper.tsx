/* eslint-disable max-len */

const FormulaWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-[135.91px] h-[64.973px] flex items-center justify-center text-sm relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="137"
        height="66"
        viewBox="0 0 137 66"
        fill="none"
        className="absolute left-0 top-0 z-10"
      >
        <path
          d="M4.57505 17.5393L18.9935 4.02753C21.0925 2.06054 23.8613 0.965955 26.7378 0.965955H124.382C130.637 0.965955 135.708 6.03715 135.708 12.2924L135.706 39.3142C135.705 42.4452 134.409 45.4363 132.124 47.5772L117.07 61.6851C114.971 63.6521 112.202 64.7467 109.325 64.7467H12.3171C6.06186 64.7467 0.991074 59.6755 0.991583 53.4202L0.993831 25.8024C0.994086 22.6714 2.29046 19.6803 4.57505 17.5393Z"
          fill="#292D32"
          fillOpacity="0.4"
          stroke="#262C33"
          strokeWidth="1.19216"
        />
      </svg>
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default FormulaWrapper
