import { defineComponent } from "vue";
import SingleRow from './SingleRow.vue'
import Rows from './SequenceViewer.js'
import { ref, h, computed } from 'vue'
import { useVirtualizer } from '@tanstack/vue-virtual'

export default defineComponent({
    name: "SequenceViewer",

    props: {
        zoom_level: {
            type: Number,
        },
    },
    
    setup(props){
        const parentRef = ref(null)
        const zoom_level = ref(props.zoom_level);

        let font_family = "Arial";
        let font_size = zoom_level.value;

        let rows = Rows(font_size, font_family);
        const rowVirtualizer = useVirtualizer({
            count: rows.length,
            getScrollElement:() => parentRef.value,
            estimateSize: () => 5 * font_size,
            overscan: 5,
        });

        const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems());
        const totalSize = computed(() => rowVirtualizer.value.getTotalSize());
    
        return () => {
            return (
                h('div', {ref: parentRef, style: {height: "400px", overflow: 'auto'}},
                    [h('div', {
                        style:{ height: `${totalSize.value}px`, width: '100%', position: 'relative' }},
                        [virtualRows.value.map((virtualRow) => {
                            return (
                                h('div', {
                                    key:virtualRow.index,
                                    style:{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: `${virtualRow.size}px`,
                                        transform: `translateY(${virtualRow.start}px)`,
                                    }}, 
                                    [<SingleRow virtualRow={virtualRow} row={rows[virtualRow.index]} font_size={font_size} font_family={font_family} />])

                            );
                        })
                    ])
                ])
            );
        };
    },

    
});