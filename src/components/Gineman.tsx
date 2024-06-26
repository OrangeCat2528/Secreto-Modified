import { FC, useState } from 'react';
import { Online } from 'react-detect-offline';
import Sande from './Sande';
import { send } from '../libs/fetcher';
import sendtelegram from "../libs/telegram";
import Sukses from './Sukses';

const Gineman: FC = () => {
  const [message, setMessage] = useState<string>('');
  const [status, setStatus] = useState<number>(1);

  const submit = async (evt: any) => {
    evt.preventDefault();

    const value = String(message).trim();
    if (value.length === 0) return;

    setStatus(2);
    const response = await send(value);
    const telegramResponse = await sendtelegram(value); // Call sendtelegram

    setStatus(3);

    setTimeout(() => {
      setStatus(1);
    }, 10_000);

    return response !== null && telegramResponse !== null ? setMessage('') : '';
  };

  const update = (evt: any) => {
    setMessage(evt.target.value);
  };

  return (
    <>
      <Sande />

      <Online>
        {status === 3 ? (
          <Sukses />
        ) : (
          <form onSubmit={submit}>
            <textarea
              value={message}
              onChange={update}
              name="gineman"
              placeholder="Kirim Pesan Disini!"
              disabled={status === 2}
            ></textarea>

            <small>
              <span className="wigatos">*</span>
              <span>
                Telegram @farrelprmnb for Random Purposes.
              </span>
            </small>

            <button className="kintun" onClick={submit}>
              {status === 2 ? 'Mengirim ...' : 'Kirim'}
            </button>
          </form>
        )}
      </Online>
    </>
  );
};

export default Gineman;
