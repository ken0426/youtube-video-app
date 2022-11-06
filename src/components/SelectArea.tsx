import { useState } from 'react';
import { sortButton } from '../contents';
import './select.css';

const SelectArea = ({
  setIsNewVideoList,
  setKeyWord,
}: {
  setIsNewVideoList: (e: boolean) => void;
  setKeyWord: (e: string) => void;
}) => {
  const [selectButtonId, setSelectButtonId] = useState(1);

  const onClick = ({ id }: { id: number }) => {
    setSelectButtonId(id);
    if (id === selectButtonId) {
    }
    if (id === 1) {
      setIsNewVideoList(true);
    } else if (id === 2) {
      setIsNewVideoList(false);
    }
  };
  return (
    <div className='selectArea'>
      <div className='detailSearch'>
        <p className='label _searchText _textColorWhite'>詳細検索</p>
        <input
          type='text'
          className='searchText _mainBackGroundColorBlack'
          placeholder='動画のタイトル名で絞り込む'
          onChange={(e) => setKeyWord(e.target.value)}
        />
        {sortButton.map((item, key) => (
          <button
            key={key}
            // className='sortButton'
            className={
              item.id === selectButtonId
                ? 'sortButton _mainBackGroundColorWhite sortButtonTextColorBlack '
                : 'sortButtonBlack _backGroundColor sortButtonTextColorWhite'
            }
            onClick={() => onClick({ id: item.id })}
          >
            {item.buttonName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectArea;
