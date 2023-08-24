import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import YouTube from './YouTube'
import StackBlitz from './StackBlitz'
import ItemGrid from './ItemGrid'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  YouTube,
  StackBlitz,
  ItemGrid,
}
