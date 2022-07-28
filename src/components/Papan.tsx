import { FC } from 'react'
import moment from 'moment'
import Gineman from './Gineman'

const Papan: FC = () => {
  const name = import.meta.env.VITE_APP_NAME

  const now = moment().locale('id')
  const that = moment('2008-02-25').locale('id')
  const birthday = that.date() === now.date() && that.month() === now.month()

  const description = birthday
    ? 'Hai Kamu! Hari ini farrel Sedang loh! Mau Ngucapin?'
    : 'Ketik Apapun Yang Ingin Kamu Sampaikan, Tapi Jangan yang Aneh" ya ✨'

  return (
    <div className="papan">
      <h1>{name}</h1>

      <p className="katrangan">{description}</p>

      <Gineman />
    </div>
  )
}

export default Papan
