export default function UserAvatar({ user, className = 'profile-avatar' }) {
  if (user?.image) {
    return (
      <img
        className={`${className} ${className}--image`}
        src={user.image}
        alt={`${user.firstName || 'User'}'s profile picture`}
      />
    )
  }
  return (
    <div className={className}>
      {user?.firstName?.[0] || ''}
      {user?.lastName?.[0] || ''}
    </div>
  )
}