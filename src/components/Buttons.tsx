import React, { ComponentProps } from 'react'
import { VariantProps, cva } from 'class-variance-authority'//cva is a utility function used to create conditional class names based on variants and condition
//cva combines all the below to a single className based on the condition of the variants sent
import { twMerge } from 'tailwind-merge'
export const buttonStyles=cva([" transition-colors"], {//adding extra vaiants of the button
    variants: {
        variant: {
            default: [" bg-secondary","hover:bg-secondary-hover"],
            ghost: ["hover:bg-gray-100"],
            dark: ['bg-secondary-dark','bg-secondary-dark-hover','text-secondary']
        },
        size: {
            default: ["rounded", "p-2"],
            icon: [
                "rounded-full",'w-10','h-10','flex','items-center','justify-center','p-2.5'
            ]
        },
        
    },
    defaultVariants: {
      variant: 'default',//it will habe a grey backbround behind it by default else if we put icon grey background wil appear when hovered over
      size: 'default'  
    }
})
type ButtonProps=VariantProps<typeof buttonStyles> & ComponentProps<'button'> //adding this if the button is being sent additional props by any chance

//variant props is a function that we import from cva that dynamically tells us the type of props based on structure of button style

const Buttons = ({variant,size,className, ...props}: ButtonProps) => {//here we are taking class name so that if the user want sto add style from where the component is being called he or she is able too do so
    //in the below line we are using twMerge function to merge the tailwind css of button styles and that sent by the user and if we dont use twMerge function it will causes clashes between css styles
  return (
    <div>
      <button {...props} className={twMerge(buttonStyles({variant,size}),className)}/> 
    </div>
  )
}

export default Buttons
