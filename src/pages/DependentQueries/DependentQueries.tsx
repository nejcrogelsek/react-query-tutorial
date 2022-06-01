import axios from 'axios'
import { FC } from 'react'
import { useQuery } from 'react-query'

interface Props {
  email: string
}

const fetchUserByEmail = (email: string) => {
  return axios.get(`http://localhost:4000/users/${email}`)
}

const fetchCoursesByChannelId = (channelId: string) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`)
}

const DependentQueries: FC<Props> = ({ email }: Props) => {
  const { data: user } = useQuery(['user', email], () => fetchUserByEmail(email))
  const channelId = user?.data.channelId
  const { data: channel } = useQuery(['courses', channelId], () => fetchCoursesByChannelId(channelId), {
    enabled: !!channelId,
  })
  return (
    <div className="dependent-queries">
      <h1>DependentQueries</h1>
      {channel?.data.courses.map((course: string, index: number) => (
        <div key={index}>{course}</div>
      ))}
    </div>
  )
}

export default DependentQueries
