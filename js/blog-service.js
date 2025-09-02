import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_KEY'
const supabase = createClient(supabaseUrl, supabaseKey)

export class BlogService {
    async fetchFeaturedPosts() {
        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .eq('featured', true)
            .order('created_at', { ascending: false })
            .limit(1)
        
        return { data, error }
    }

    async fetchRecentPosts(limit = 4) {
        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(limit)
        
        return { data, error }
    }

    async fetchPostsByCategory(category, page = 1, perPage = 9) {
        const from = (page - 1) * perPage
        const to = from + perPage - 1

        const { data, error } = await supabase
            .from('blogs')
            .select('*', { count: 'exact' })
            .eq('category', category)
            .order('created_at', { ascending: false })
            .range(from, to)
        
        return { data, error }
    }
}
