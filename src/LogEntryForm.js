import React, { useState } from 'react'
import {useForm} from 'react-hook-form';
import { createLogEntry } from './API';

const LogEntryForm = ({location, onClose}) => {
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('');
    const onSubmit= async (data)=>{
        console.log(data);
        data.latitude= location.latitude;
        data.longitude = location.longitude;
        try{
            setLoading(true);
            await createLogEntry(data);
            onClose();
        }
        catch(errors){
            setError(errors.message);
            setLoading(false);

        }
    }
    return (
        <div>
            <form className="entry-form" onSubmit={handleSubmit(onSubmit)}>
                {error ?(<h3 className="error">{error}</h3>) : null}
                <label htmlFor="title">Title</label>
                <input  required {...register("title")}/>
                <label htmlFor="comments">Comments</label>
                <textarea  rows={3} {...register("comments")}/>
                <label htmlFor="description">Description</label>
                <textarea  rows={3} {...register("description")}/>
                <label htmlFor="image">Image</label>
                <input {...register("image")}/>
                <label htmlFor="visitDate">Visit Date</label>
                <input  type="date" required  {...register("visitDate")}/>
                <button disabled={loading}>{loading ? "Loading ..." :"Add Entry"}</button>


            </form>
        </div>
    )
}

export default LogEntryForm
