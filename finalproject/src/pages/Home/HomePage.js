import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { getAll, getAllByTag, getAllTags, search } from '../../services/cupService';
import Thumbnails from '../../components/Thumbnails/Thumbnails';
import Search from '../../components/Search/Search';
import Tags from '../../components/Tags/Tags';
import NotFound from '../../components/NotFound/NotFound';

const initialState = { cups: [], tags: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case 'CUPS_LOADED':
      return { ...state, cups: action.payload };
    case 'TAGS_LOADED':
      return { ...state, tags: action.payload };
    default:
      return state;
  }
};

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cups, tags } = state;
  const { searchTerm, tag } = useParams();

  useEffect(() => {
    getAllTags().then((tags) => dispatch({ type: 'TAGS_LOADED', payload: tags }));

    const loadCups = tag
      ? getAllByTag(tag)
      : searchTerm
      ? search(searchTerm)
      : getAll();

    loadCups.then(cups => dispatch({ type: 'CUPS_LOADED',  payload: cups }));
  }, [searchTerm, tag]);

  return (
    <>
      <Search />
      <Tags tags={tags} />
      {cups.length === 0 && <NotFound linkText="Reset Search" />}
      <Thumbnails cups={cups} />
    </>
  );
}
