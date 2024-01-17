
export default interface ConfigInterface {
    themes: {
        container?: string,
        label?: string,
        insider?: string,
        'before-icon'?: string,
        'after-icon'?: string,
        help?: string,
        errors?: string,

        input?: string,

        // Checkbox
        'checkbox-list'?: string,
        'checkbox-item'?: string,
        'checkbox-label'?: string,
        'checkbox'?: string,

        // File
        'file-label'?: string,
        'file-list'?: string,
        'file-item'?: string,

        // Group
        'group-container'?: string,
        'group-title'?: string,

        // Radio
        'radio-list'?: string,
        'radio-item'?: string,
        'radio-label'?: string,
        'radio'?: string,

        // Toggle
        toggle?: string,
        'toggle-label'?: string

        // Search
        'search-option'?: string,
        'search-list'?: string,
        'search-item'?: string,
        'search-load'?: string,
        'search-options'?: string,

        // Select
        'select-options'?: string,
        'select-option'?: string,
        'select-load'?: string,

        // Taglist
        'taglist-tag'?: string,
        'taglist-option'?: string,
        'taglist-tags'?: string,
        'taglist-load'?: string,
        'taglist-options'?: string,
        'taglist-option-selected'?: string,

        [x: string]: string | undefined,
    }
}
