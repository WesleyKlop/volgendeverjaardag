<template>
  <Listbox
    v-model="selectedOption"
    as="div"
  >
    <ListboxLabel class="block text-sm leading-6 font-medium text-gray-900">
      {{ label }}
    </ListboxLabel>

    <div class="relative mt-1">
      <ListboxButton
        class="relative w-full cursor-default rounded-md bg-white py-1.5 pr-10 pl-3 text-left text-gray-900 ring-1 shadow-sm ring-gray-300 ring-inset focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm sm:leading-6"
      >
        <span class="flex items-center">
          <span class="block truncate">{{ selectedOption.label }}</span>
        </span>

        <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
          <ChevronUpDownIcon
            class="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="ring-opacity-5 absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black focus:outline-none sm:text-sm"
        >
          <ListboxOption
            v-for="option in options"
            :key="option.value"
            v-slot="{ active, selected }"
            as="template"
            :value="option"
          >
            <li
              :class="[
                active ? 'bg-blue-600 text-white' : 'text-gray-900',
                'relative cursor-default py-2 pr-9 pl-3 select-none',
              ]"
            >
              <div class="flex items-center">
                <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                  {{ option.label }}
                </span>
              </div>

              <span
                v-if="selected"
                :class="[
                  active ? 'text-white' : 'text-blue-600',
                  'absolute inset-y-0 right-0 flex items-center pr-4',
                ]"
              >
                <CheckIcon
                  class="h-5 w-5"
                  aria-hidden="true"
                />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const model = defineModel<string>()
const props = defineProps<{
  label: string
  options: Array<{ label: string; value: string }>
}>()

const selectedVal = ref(0)

const selectedOption = computed<(typeof props.options)[number]>({
  get() {
    return props.options[selectedVal.value]
  },
  set(v) {
    model.value = v.value
    selectedVal.value = props.options.indexOf(v)
  },
})
</script>
