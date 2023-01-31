import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { GET_PHOTOS } from '../query/GetPhotos';

const options = {
    "options": {
        "search": {
            "q": "a"
        },
        "paginate": {
            "limit": 5,
            "page": 1
        },
    },
};


type Photo = {
    id: number
    title: string
    thumbnailUrl: string
}


const columnHelper = createColumnHelper<Photo>()


const columns = [
    columnHelper.accessor('id', {
        header: () => 'ID',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('title', {
        header: () => 'Title',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('thumbnailUrl', {
        header: () => 'Image',
        cell: info => <img src={info.getValue()} alt="photo" />,
    }),
]

const Photos: React.FC = () => {

    const { loading, error, data } = useQuery(GET_PHOTOS, { variables: options });
    const { photos = [] } = data || {};
    const { data: photosData = [] } = photos;
    const table = useReactTable({
        data: photosData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [modalIsOpen, setIsOpen] = useState(false);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div className="p-2">
            <table>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Photos;
