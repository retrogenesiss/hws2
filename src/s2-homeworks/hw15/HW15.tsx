import React, {useEffect, useState} from 'react'
import s8 from './../hw08/HW8.module.css'
import s2 from '../../s1-main/App.module.css'
import s from './HW15.module.css'
import axios from 'axios'
import SuperPagination from './common/c9-SuperPagination/SuperPagination'
import {useSearchParams} from 'react-router-dom'
import SuperSort from './common/c10-SuperSort/SuperSort'
import {Loader} from "../hw10/Loader";

/*
* 1 - дописать SuperPagination
* 2 - дописать SuperSort
* 3 - проверить pureChange тестами
* 3 - дописать sendQuery, onChangePagination, onChangeSort в HW15
* 4 - сделать стили в соответствии с дизайном
* 5 - добавить HW15 в HW5/pages/JuniorPlus
* */

type TechType = {
    id: number
    tech: string
    developer: string
}

type ParamsType = {
    sort: string
    page: number
    count: number
}

const getTechs = (params: ParamsType) => {
    return axios
        .get<{ techs: TechType[], totalCount: number }>(
            'https://samurai.it-incubator.io/api/3.0/homework/test3',
            {params}
        )
        .catch((e) => {
            alert(e.response?.data?.errorText || e.message)
        })
}

const HW15 = () => {
    const [sort, setSort] = useState('')
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(4)
    const [idLoading, setLoading] = useState(false)
    const [totalCount, setTotalCount] = useState(100)
    const [searchParams, setSearchParams] = useSearchParams()
    const [techs, setTechs] = useState<TechType[]>([])

    const sendQuery = (params: ParamsType) => {
        setLoading(true)
        getTechs(params)
            .then((res) => {
                // делает студент
                setLoading(false)
                // сохранить пришедшие данные
                if (res) {
                    setTotalCount(res.data.totalCount)
                    setTechs(res.data.techs)
                }
                //
            })
            .catch((error) => {
                throw error;
            });
    }

    const onChangePagination = (newPage: number, newCount: number) => {
        // делает студент
        setPage(newPage)
        setCount(newCount)
        // setPage(
        // setCount(
        sendQuery({page: newPage, count: newCount, sort})
        setSearchParams({page: newPage.toString(), count: newCount.toString()})
        // sendQuery(
        // setSearchParams(

        //
    }

    const onChangeSort = (newSort: string) => {
        // делает студент
        setSort(newSort)
        setPage(1)
        // setSort(
        // setPage(1) // при сортировке сбрасывать на 1 страницу
        sendQuery({page, count, sort: newSort})
        setSearchParams({page: '1', count: count.toString()})
        // sendQuery(
        // setSearchParams(

        //
    }

    useEffect(() => {
        const params = Object.fromEntries(searchParams)
        const parsedPage = +params.page || 1; // Parse page to number
        const parsedCount = +params.count || 4; // Parse count to number
        sendQuery({page: parsedPage, count: parsedCount, sort})
        setPage(parsedPage)
        setCount(parsedCount)
    }, [searchParams, sort])

    const mappedTechs = techs.map(t => (
        <div key={t.id} className={s.row}>
            <div id={'hw15-tech-' + t.id} className={s.tech}>
                {t.tech}
            </div>

            <div id={'hw15-developer-' + t.id} className={s.developer}>
                {t.developer}
            </div>
        </div>
    ))

    return (
        <div id={'hw15'}>
            <div className={s2.container}>
                <div className={s2.hwTitle}>Homework №15</div>
            </div>
            <hr/>
            <div className={s2.container}>
                <div className={s2.hw} style={{
                    marginTop: "32px",
                    position: "relative",
                    width: "606px",
                }}>
                    {
                        idLoading &&
                        <div className={s.loadingWrapper}>
                            <div className={s.loading}>
                                <Loader />
                            </div>
                        </div>
                    }

                    <SuperPagination
                        page={page}
                        itemsCountForPage={count}
                        totalCount={totalCount}
                        onChange={onChangePagination}
                    />

                    <table className={s8.users} style={{marginTop: "38px"}}>
                        <thead className={s8.thead} style={{background: "#E5E5E5"}}>
                        <tr>
                            <td className={s8.nameCol}>Tech<SuperSort sort={sort} value={'tech'} onChange={onChangeSort}/></td>
                            <td className={s8.ageCol}>Developer<SuperSort sort={sort} value={'developer'} onChange={onChangeSort}/></td>
                        </tr>
                        </thead>

                        <tbody>{mappedTechs}</tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default HW15
