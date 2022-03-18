import style from './UserCard.module.css';
import { User } from '../../models';
import classNames from 'classnames';

export type UserCardProps = {
    user: User;
};

const UserCard = ({ user }: UserCardProps) => (
    <article class={classNames(style.this, { [style.me]: user.login === 'mbicknese' })}>
        {user.avatar ? <img src={user.avatar} alt={`Avatar image of ${user.name}`} /> : null}
        <h2>
            <a href={`https://github.com/${user.login}`} rel="external" tabIndex={0}>
                {user.name}
            </a>
        </h2>
        {user.bio ? (
            <p class={style.bio} aria-label="user detail">
                {user.bio}
            </p>
        ) : null}
        <p class={style['star-count']} aria-label="user detail">
            {user.starCount} <span>star{user.starCount !== 1 ? 's' : ''}</span>
        </p>
        <p class={style['repo-count']} aria-label="user detail">
            {user.repositoryCount} <span>repo{user.repositoryCount !== 1 ? 's' : ''}</span>
        </p>
        {user.quote ? <blockquote aria-label="user detail">{user.quote}</blockquote> : null}
    </article>
);

export default UserCard;
