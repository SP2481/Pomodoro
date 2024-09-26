'use client'

import { getAllSessions } from '@/utils/api/session'
import Cookies from 'js-cookie'
import { useQuery } from 'react-query'
import columns from '../../components/columns'
import DataTable from './sessions/table'

export default function SessionsView() {
    const token = Cookies.get('accesstoken')
    const sessions = useQuery({
        queryKey: ['sessions', token],
        queryFn: () => getAllSessions(),
        retry: false,
    })

    return (
        <div className='flex flex-col justify-start items-center w-full gap-5'>
            <h1 className='text-4xl text-white text-center'>Sessions</h1>
            {sessions?.data?.length > 0 ?
                <DataTable data={sessions?.data} columns={columns} />
                : (
                    <h1 className='text-white text-center'>You havent completed any sessions</h1>
                )
            }
        </div>
    )
} 