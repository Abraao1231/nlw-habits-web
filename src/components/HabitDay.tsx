import * as Popover from '@radix-ui/react-popover';
import { Progressbar } from './ProgressBar';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { HabitsList } from './HabitsList';
import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'phosphor-react'
import * as HoverCard from "@radix-ui/react-hover-card";
import { useEffect } from 'react';

interface HabitDayProps {
  date: Date
  defaultCompleted?: number,
  amount?: number,
  disabled: boolean
}

export default function HabitDay({ date, defaultCompleted = 0, amount = 0, disabled }: HabitDayProps) {

  const [completed, setCompleted] = useState(defaultCompleted)
  const completedPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0

  const dayAndMonth = dayjs(date).format('DD/MM')
  const dayOfWeek = dayjs(date).format('dddd')
  useEffect(() => {
    setCompleted(defaultCompleted); // Atualiza 'completed' quando 'defaultCompleted' mudar
  }, [defaultCompleted]);
  function handleCompletedChange(completed: number) {

    setCompleted(completed);
  }



  return (
    <HoverCard.Root openDelay={150}>
      <HoverCard.Trigger className={
        clsx('w-7 h-7 rounded-md transition-colors hover:outline-none hover:ring-2 hover:ring-violet-600 hover:ring-offset-2 hover:ring-offset-background', {
          'bg-zinc-900 border-violet-800 ': completedPercentage === 0,
          'bg-violet-900 border-zinc-800 ': completedPercentage > 0 && completedPercentage < 20,
          'bg-violet-800 border-violet-700 ': completedPercentage >= 20 && completedPercentage < 40,
          'bg-violet-700 border-violet-600 ': completedPercentage >= 40 && completedPercentage < 60,
          'bg-violet-600 border-violet-500 ': completedPercentage >= 60 && completedPercentage < 80,
          'bg-violet-500 border-violet-400 ': completedPercentage >= 80
        })
      } />
      <HoverCard.Portal>
        <HoverCard.Content>
          <div className=' text-white min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col'>
          <h1 className='text-xl font-semibold'>{dayAndMonth}</h1>

            <span className='font-semibold text-zinc-400'>{dayOfWeek}</span>
            <span className='mt-1 font-extrabold leading-tigth text-3xl'></span>


            <HabitsList onCompletedChange={handleCompletedChange} date={date} disable={disabled} />
            {/* <Popover.Arrow className='fill-zinc-900' height={8} width={16}/> */}
          </div>
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  )
  return (
    <Dialog.Root>
      <Dialog.Trigger
        className={
          clsx('w-7 h-7 rounded-md transition-colors hover:outline-none hover:ring-2 hover:ring-violet-600 hover:ring-offset-2 hover:ring-offset-background', {
            'bg-zinc-900 border-violet-800 ': completedPercentage === 0,
            'bg-violet-900 border-zinc-800 ': completedPercentage > 0 && completedPercentage < 20,
            'bg-violet-800 border-violet-700 ': completedPercentage >= 20 && completedPercentage < 40,
            'bg-violet-700 border-violet-600 ': completedPercentage >= 40 && completedPercentage < 60,
            'bg-violet-600 border-violet-500 ': completedPercentage >= 60 && completedPercentage < 80,
            'bg-violet-500 border-violet-400 ': completedPercentage >= 80
          })
        }
      >

      </Dialog.Trigger>

      <Dialog.Portal>

        <Dialog.Overlay className='w-screnn h-screen bg-black/80 fixed inset-0' />
        <Dialog.Content className='text-white absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <Dialog.Close>
            <X
              className='absolute right-6 top-6 text-zinc-400 hover:text-zinc-200'
              size={24}
              aria-label='Fechar'
            />
          </Dialog.Close>
          <Dialog.Title className='text-3xl leading-tigth font-extrabold'>{dayAndMonth}</Dialog.Title>
          <div className=' text-white min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col'>
            <span className='font-semibold text-zinc-400'>{dayOfWeek}</span>
            <span className='mt-1 font-extrabold leading-tigth text-3xl'></span>

            <Progressbar progress={completedPercentage} />

            <HabitsList onCompletedChange={handleCompletedChange} date={date} disable={disabled} />
            {/* <Popover.Arrow className='fill-zinc-900' height={8} width={16}/> */}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
  return (
    <Popover.Root >

      <Popover.Portal>
        <Popover.Content className=' text-white min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col'>
          <span className='font-semibold text-zinc-400'>{dayOfWeek}</span>
          <span className='mt-1 font-extrabold leading-tigth text-3xl'>{dayAndMonth}</span>

          <Progressbar progress={completedPercentage} />

          <HabitsList onCompletedChange={handleCompletedChange} date={date} disable={disabled} />
          <Popover.Arrow className='fill-zinc-900' height={8} width={16} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>

  )
}
