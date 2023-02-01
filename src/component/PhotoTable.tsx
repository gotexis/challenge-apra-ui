import React, { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    PaginationState,
} from '@tanstack/react-table'
import { GET_PHOTOS } from '../query/GetPhotos';
import SearchBar from './Searchbar';
import Modal from './Modal';

type Photo = {
    id: number
    title: string
    thumbnailUrl: string
}

type PhotoQuery = {
    photos: {
        data: Photo[],
        links: {
            first: {
                limit: number,
                page: number,
            },
            last: {
                limit: number,
                page: number,
            },
            next: {
                limit: number,
                page: number,
            },
        }
    }
}

const Photos: React.FC = () => {
    const [search, setSearch] = useState<string>('');
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    })

    const options = {
        "options": {
            "search": {
                "q": search
            },
            "paginate": {
                "limit": pageSize,
                "page": pageIndex + 1
            },
        },
    };

    const { loading, error, data } = useQuery<PhotoQuery>(GET_PHOTOS, { variables: options });
    const photosData = data?.photos?.data || [];

    const [selectedImage, setSelectedImage] = useState<string | undefined>();

    const columnHelper = createColumnHelper<Photo>()
    const columns = useMemo(() => [
        columnHelper.accessor('id', {
            header: () => 'ID',
            cell: info => <button onClick={() => setSelectedImage(info.row.original.thumbnailUrl)}>{info.getValue()}</button>,
        }),
        columnHelper.accessor('title', {
            header: () => 'Title',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('thumbnailUrl', {
            header: () => 'Image',
            cell: info => <button onClick={() => setSelectedImage(info.row.original.thumbnailUrl)}>
                <img src={info.getValue()} alt="photo" className='max-h-[80px]' />
            </button>,
        }),
    ], [columnHelper]);

    const table = useReactTable<Photo>({
        data: photosData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })


    return (
        <>
            <Modal
                image={selectedImage}
                onClose={() => setSelectedImage(undefined)}
            />
            <div className="p-2 max-w-screen-lg flex flex-col justify-center m-auto">
                <SearchBar onSubmit={setSearch} />
                {
                    loading && <p>Loading...</p>
                }
                {
                    error && <p>Error :(</p>
                }
                {
                    !loading && !error && <table className="table-auto w-full text-left">
                        <thead className="bg-green-500 text-white">
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th key={header.id} className="p-2 font-bold">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map((row, index) => (
                                <tr key={row.id} className={`${index % 2 === 0 ? 'bg-green-100' : 'bg-white'}`}>
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="border p-2">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>
        </>
    )
}

export default Photos;
