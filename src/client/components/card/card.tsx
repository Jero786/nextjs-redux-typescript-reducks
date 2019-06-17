// Resources
import './card.scss';

// Libs
import React, {useState, memo} from 'react';
import {toggler, getElementByClassName} from '../../utils/content-utils';

interface Avatar {
    _id: string;
    name?: string;
}

interface CardProps {
    key?: string;
    title: string;
    shortDescription: string;
    longDescription: string;
    onClickDelete: () => void;
    onClickSave: (object) => void;
    itemId: string;
    selectedAvatarsId: string[];
    avatars: Avatar[];
}

function Card({
                  title,
                  shortDescription = '',
                  longDescription = '',
                  onClickDelete = () => {},
                  onClickSave = () => {},
                  itemId = '',
                  avatars = [],
                  selectedAvatarsId = [],
              }: CardProps) {

    const [isEditMode, setIsEditMode] = useState(false);
    const [stateTitle, setStateTitle] = useState(title);
    const [stateDescription, setStateDescription] = useState(shortDescription);
    const [stateLongDescription, setStateLongDescription] = useState(longDescription);
    const [stateSelectedAvatars, setStateSelectedAvatars] = useState(selectedAvatarsId);

    const titleEl = renderTitle(isEditMode, setStateTitle, stateTitle, setIsEditMode);
    const descriptionEl = renderShortDescription(isEditMode, setStateDescription, stateDescription, setIsEditMode);
    const longDescriptionEl = renderLongDescription(
        setStateLongDescription,
        stateLongDescription,
        setIsEditMode,
        isEditMode,
    );
    const deleteButtonEl = renderDeleteButton(isEditMode, onClickDelete, itemId);
    const cancelButtonEl = renderCancelButton(
        isEditMode,
        setStateLongDescription,
        longDescription,
        setStateDescription,
        shortDescription,
        setStateTitle,
        title,
        setIsEditMode,
        selectedAvatarsId,
        setStateSelectedAvatars
    );

    const listEl = renderAvatarList(itemId, avatars, stateSelectedAvatars, isEditMode, setIsEditMode, (selectedAvatarsUpdated) => {
        setStateSelectedAvatars(selectedAvatarsUpdated);
    });

    return (
        <div className="vtm-card">
            <div className="vtm-card__header">
                {titleEl}
                <small className="vtm-card__subtitle">Id: {itemId}</small>
                <div className="vtm-card__header-description">{descriptionEl}</div>
            </div>
            <div className="vtm-card__middle">
                {longDescriptionEl}
            </div>
            <div className="vtm-card__sibling-middle">{listEl}</div>
            <div className="vtm-card__body">
                {isEditMode ? cancelButtonEl : deleteButtonEl}
                <button
                    onClick={() => {
                        if (isEditMode) {
                            onClickSave({
                                short_description: stateDescription,
                                long_description: stateLongDescription,
                                title: stateTitle,
                                authors: stateSelectedAvatars,
                                _id: itemId ? itemId : undefined,
                            });
                        }
                        setIsEditMode(!isEditMode);
                    }}
                    className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
                >
                    <i className="material-icons">{isEditMode ? 'save' : 'edit'}</i>
                </button>
            </div>
        </div>
    );
}

function isAvatarChecked(avatarToValidate: Avatar = {_id: '-1'}, avatarSelected: string[] = []) {
    return avatarSelected.indexOf(avatarToValidate._id) > -1;
}

function renderLongDescription(setStateLongDescription, stateLongDescription, setIsEditMode, isEditMode) {
    return isEditMode ? (
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <textarea
                className="mdl-textfield__input"
                onChange={evt => setStateLongDescription(evt.target.value)}
                id="textLarge"
                defaultValue={stateLongDescription}
            />
            <label className="mdl-textfield__label" htmlFor="textLarge">
                {!stateLongDescription ? 'Long description' : ''}
            </label>
        </div>
    ) : (
        <div onClick={() => setIsEditMode(!isEditMode)}>{stateLongDescription}</div>
    );
}

function renderShortDescription(isEditMode, setStateDescription, stateDescription, setIsEditMode) {
    return isEditMode ? (
        <div className="vtm-card__short-description mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input
                className="mdl-textfield__input"
                onChange={evt => setStateDescription(evt.target.value)}
                type="text"
                id="textShort"
                defaultValue={stateDescription}
            />
            <label className="mdl-textfield__label" htmlFor="textShort">
                {!stateDescription ? 'Short description' : ''}
            </label>
        </div>
    ) : (
        <div onClick={() => setIsEditMode(!isEditMode)}>{stateDescription}</div>
    );
}

function renderTitle(isEditMode, setStateTitle, stateTitle, setIsEditMode) {
    return isEditMode ? (
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input
                className="mdl-textfield__input"
                onChange={evt => setStateTitle(evt.target.value)}
                type="text"
                id="textTitle"
                defaultValue={stateTitle}
            />
            <label className="mdl-textfield__label" htmlFor="textTitle">
                {!stateTitle ? 'Title' : ''}
            </label>
        </div>
    ) : (
        <h3 onClick={() => setIsEditMode(!isEditMode)} className="vtm-card__header-title">
            {stateTitle}
        </h3>
    );
}

function renderDeleteButton(isEditMode, onClickDelete, itemId) {
    return isEditMode ? (
        <button disabled className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
            <i className="material-icons">delete</i>
        </button>
    ) : (
        <button
            onClick={() => onClickDelete(itemId)}
            className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
        >
            <i className="material-icons">delete</i>
        </button>
    );
}

function renderCancelButton(
    isEditMode,
    setStateLongDescription,
    longDescription,
    setStateDescription,
    shortDescription,
    setStateTitle,
    title,
    setIsEditMode,
    selectedAvatarsId,
    setStateSelectedAvatars
) {
    return isEditMode ? (
        <button
            className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
            onClick={() => {
                setStateLongDescription(longDescription);
                setStateDescription(shortDescription);
                setStateTitle(title);
                setStateSelectedAvatars(selectedAvatarsId);
                setIsEditMode(!isEditMode);
            }}
        >
            <i className="material-icons">clear</i>
        </button>
    ) : null;
}

function renderAvatarList(itemId, avatars, selectedAvatarsId, isEditMode, setIsEditMode, onFinishToggle) {
    let avatarsEl;
    let listEl;

    if (avatars) {
        avatarsEl = renderAvatarEl(itemId, avatars, selectedAvatarsId);
        listEl = (
            <ul onClick={isEditMode ? onClickAvatar.bind(this, selectedAvatarsId, onFinishToggle) : () => {
                setIsEditMode(!isEditMode)
            }}
                className={`vtm-avatar__list mdl-list${isEditMode ? ' is-edit' : ''}`}>
                {avatarsEl}
            </ul>
        );
    }
    return listEl;
}


function onClickAvatar(selectedAvatarsId, onFinishToggle, evt) {
    // using here list-item as a Mediator, to perform event delegation.
    const parentItemEl = getElementByClassName(evt.target, 'vtm-avatar__list-item');
    const avatarId = parentItemEl.getAttribute('data-avatar-id');

    toggleSelectedAvatar(selectedAvatarsId.slice(), avatarId, onFinishToggle);
}


function toggleSelectedAvatar(selectedAvatarsId: [], avatarId: string, onFinishToggle): void {
    const selectedAvatarsUpdated = toggler(selectedAvatarsId, avatarId);
    onFinishToggle(selectedAvatarsUpdated);
}

function renderAvatarEl(itemId, avatars = [], selectedAvatarsId = []) {
    return avatars.map(avatar => {

        const avatarEl = (
            <input data-avatar-id={avatar._id}
                   type="checkbox"
                   id={`list-checkbox-${avatar._id}_${itemId}`}
                   className="mdl-switch__input"
                   onChange={() => {}} // we are using event delegation pattern, here nothing to do, just empty function to avoid React warning
                   checked={isAvatarChecked(avatar, selectedAvatarsId)}
            />
        );

        return (
            <li key={`avatar-id-${avatar._id}_${itemId}`} data-avatar-id={avatar._id}
                className="vtm-avatar__list-item mdl-list__item">
                <small className="vtm-avatar__list-item-subtitle">Id: {avatar._id}</small>
                <span className="mdl-list__item-primary-content">
                    <i className="material-icons mdl-list__item-avatar">person</i>
                    <div>
                    {avatar.title}
                    </div>
                </span>
                <span className="mdl-list__item-secondary-action">
                    <label className="mdl-switch"
                           htmlFor={`list-checkbox-${avatar._id}_${itemId}`}>
                        {avatarEl}
                    </label>
                </span>
            </li>
        );
    });
}

export default memo(Card);
