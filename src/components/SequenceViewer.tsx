import { defineComponent } from "vue";
import SingleRow from './SingleRow.vue'
import Rows from './SequenceViewer.ts'
import { ref, h, computed } from 'vue'
import { useVirtualizer } from '@tanstack/vue-virtual'

export default defineComponent({
    name: "SequenceViewer",

    props: {
        zoom_level: {
            type: Number,
        },
    },
    
    setup(props: { zoom_level: Number | undefined }){
        const parentRef = ref(null)
        const zoom_level = ref(props.zoom_level);

        const font_family = "Arial";
        const font_size: Number = zoom_level.value ? zoom_level.value : 12;

        const rows = Rows(font_size, font_family);
        const rowVirtualizer = useVirtualizer({
            count: rows.length,
            getScrollElement: () => parentRef.value,
            estimateSize: () => 5 * Number(font_size),
            overscan: 5,
        });

        const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems());
        const totalSize = computed(() => rowVirtualizer.value.getTotalSize());
    
        return () => {
            return (
                h('div', {ref: parentRef, style: {height: "400px", overflow: 'auto'}},
                    [h('div', {
                        style:{ height: `${totalSize.value}px`, width: '100%', position: 'relative' }},
                        [virtualRows.value.map((virtualRow:{ index: number, size: number, start: number }) => {
                            return (
                                h('div', {
                                    key: virtualRow.index,
                                    style: {
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: `${virtualRow.size}px`,
                                        transform: `translateY(${virtualRow.start}px)`,
                                    }
                                },
                                [h(SingleRow, { virtualRow, row: rows[virtualRow.index], font_size: font_size, font_family: font_family })])
                            );
                        })
                    ])
                ])
            );
        };
    },

    
});