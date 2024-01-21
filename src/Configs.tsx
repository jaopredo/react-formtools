import ConfigInterface from "./types/config"

export function useAppConfig(): ConfigInterface {
    return {
        themes: {
            container: 'flex justify-center gap-1 flex-col',
            label: 'font-bold',
            insider: 'group flex items-center gap-1 relative w-fit rounded-md p-1',
            "after-icon": 'text-xl text-indigo-500 hover:cursor-pointer',
            "before-icon": 'text-xl text-indigo-500 hover:cursor-pointer',
            errors: 'text-sm text-rose-400 font-bold',
            help: 'text-gray-600 text-sm',
    
            input: 'outline-none',
    
            // Checkbox
            'checkbox-list': '',
            'checkbox-item': 'flex items-center justify-end gap-2',
            'checkbox-label': 'hover:cursor-pointer',
            'checkbox': '',
            // 'checkbox:insider': '!border-none !focus-within:ring-0 !focus-within:ring-offset-0',
    
            // Radio
            'radio-list': '',
            'radio-item': 'flex items-center justify-end gap-2',
            'radio-label': 'hover:cursor-pointer',
            'radio': 'accent-indigo-900',
            // 'radio:insider': '!border-none !focus-within:ring-0 !focus-within:ring-offset-0',
    
            // Toggle
            'toggle': '',
            'toggle-label': 'hover:cursor-pointer',
            // 'toggle:insider': '!border-none !focus-within:ring-0 !focus-within:ring-offset-0',
    
            // Search
            "search-options": 'h-32 overflow-auto absolute top-10 bg-gray-100 rounded-md shadow-md z-10 min-w-full',
            "search-option": 'hover:bg-indigo-500 hover:text-white hover:cursor-pointer p-2',
            "search-item": 'text-xs bg-indigo-500 rounded-md p-1 text-white hover:cursor-pointer',
            "search-list": 'flex items-center justify-center gap-1',
            "search-load": 'text-center text-indigo-500 font-bold',
            'search:insider': 'border focus-within:ring-2 focus-within:ring-offset-1 focus-within:ring-indigo-500',
            
            // Select
            "select-load": 'text-center text-indigo-500 font-bold',
            "select-options": 'h-32 overflow-auto absolute top-10 bg-gray-100 rounded-md shadow-md z-10 min-w-full',
            "select-option": 'hover:bg-indigo-500 hover:text-white hover:cursor-pointer p-2',
            'select:insider': 'border focus-within:ring-2 focus-within:ring-offset-1 focus-within:ring-indigo-500',
    
            // Taglist
            "taglist-load": 'text-center text-indigo-500 font-bold',
            'taglist-option': 'hover:bg-indigo-500 hover:text-white hover:cursor-pointer p-2',
            'taglist-options': 'h-32 overflow-auto absolute top-10 bg-gray-100 rounded-md shadow-md z-10 min-w-full',
            'taglist-tag': 'text-xs bg-indigo-500 rounded-md p-1 text-white hover:cursor-pointer',
            'taglist-tags': 'flex items-center justify-center gap-1',
            "taglist-option-selected": 'bg-indigo-500 text-white ',
            'taglist:insider': 'border focus-within:ring-2 focus-within:ring-offset-1 focus-within:ring-indigo-500',
    
            // File
            'file-label': 'text-gray-500 mr-1',
            "file-list": 'flex items-center justify-center flex-col gap-1',
            'file:insider': 'border focus-within:ring-2 focus-within:ring-offset-1 focus-within:ring-indigo-500',
    
            // Group
            'group-container': '',
            'group-title': '',

            'input:insider': 'border focus-within:ring-2 focus-within:ring-offset-1 focus-within:ring-indigo-500',
            'mask:insider': 'border focus-within:ring-2 focus-within:ring-offset-1 focus-within:ring-indigo-500',
            'password:insider': 'border focus-within:ring-2 focus-within:ring-offset-1 focus-within:ring-indigo-500',
        }
    }
}
