import Loader from '@/components/ui/loader'

export default function Loading() {
  return (
    <div className="flex justify-center items-center w-full">
      <Loader text="GENERATING HOROSCOPE" />
    </div>
  )
}
